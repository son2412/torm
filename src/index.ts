import 'module-alias/register';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import { Request, Response } from 'express';
import * as path from 'path';
import routes from './routes';
import { socket } from '@util/Socket';
import config from './app/config/app';
import RequestLogger from '@util/Logger';
import * as RateLimit from 'express-rate-limit';
import * as methodOverride from 'method-override';
import { StatusCodes } from 'http-status-codes';
const cors = require('cors');

const app = express();
const http = require('http').Server(app);
createConnection()
  .then(async () => {
    const limiter = RateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      handler: (req, res) =>
        res
          .status(StatusCodes.TOO_MANY_REQUESTS)
          .json({ success: false, errorCode: StatusCodes.TOO_MANY_REQUESTS, message: 'Too many requests!' }),
      skip: (req: Request) => {
        if (req.ip === '::ffff:127.0.0.1') return true;
        return false;
      }
    });
    app.use(express.urlencoded({ extended: true }), express.json(), express.text());
    app.use(cors());
    app.use(methodOverride('_method'));
    app.use((req: Request, res: Response, next) => {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        delete req.body._method;
      }
      return RequestLogger(req, res, next);
    });
    app.use(limiter);
    /**
     * Register all service that declared in /app/Configs/Providers
     */
    config.providers.map((provider) => {
      const instance = new provider();
      instance.register();
      if (instance.boot) {
        instance.boot();
      }
      return true;
    });
    app.use('/upload', express.static(process.env.PORT === 'local' ? 'src/uploads' : 'build/uploads'));
    app.use('/', routes);
    app.get('/real-time', (req: any, res: any) => {
      res.sendFile(path.resolve('./src/index.html'));
    });
    socket(http);

    http.listen(process.env.PORT, function () {
      console.log(`Server running on port ${process.env.PORT}, environment: ${process.env.APP_ENV}`);
    });
  })
  .catch((error) => console.log(error));
