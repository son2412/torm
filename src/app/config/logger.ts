import { configure, getLogger } from 'log4js';

configure({
  appenders: {
    console: {
      type: 'console'
    },
    errorFile: {
      type: 'dateFile',
      filename: 'logs/error.log',
      keepFileExt: true,
      backups: 5
    },
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errorFile'
    }
  },
  categories: { default: { appenders: ['console', 'errors'], level: 'debug' } }
});

function log(service) {
  const logger = getLogger(service);
  return logger;
}
export { log };
