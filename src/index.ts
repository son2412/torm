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
const cors = require('cors');

const app = express();
const http = require('http').Server(app);
createConnection()
  .then(async () => {
    app.use(bodyParser.json());
    app.use(cors());
    app.use((req: Request, res: Response, next) => RequestLogger(req, res, next));
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
