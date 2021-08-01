import 'module-alias/register';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import routes from './routes';
import { socket } from '@service/Socket';
import config from './app/config/app';
import RequestLogger from '@service/Logger';
import * as RateLimit from 'express-rate-limit';
const cors = require('cors');

const app = express();
const http = require('http').Server(app);
createConnection()
  .then(async () => {
    const limiter = RateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      handler: (req, res) => res.status(429).json({ success: false, errorCode: 429, message: 'Too many requests!' }),
      skip: (req, res) => {
        if (req.ip === '::ffff:127.0.0.1') return true;
        return false;
      }
    });
    app.use(bodyParser.json());
    app.use(cors());
    app.use((req: Request, res: Response, next) => RequestLogger(req, res, next));
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
