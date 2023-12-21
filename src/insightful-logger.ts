import winston from 'winston';
import { v4 as uuidv4 } from 'uuid';

const requestId = uuidv4();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] })
  ),
  defaultMeta: { requestId },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({ filename: 'app.log' })
  ]
});

const injectMetadata = (additionalMetadata: Record<string, any>) => {
  return winston.format((info) => {
    info.metadata = { ...info.metadata, ...additionalMetadata };
    return info;
  })();
};

const errorMiddleware = (
  err: { status?: number; message: string },
  req: any,
  res: any,
  next: any
) => {
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(err.status || 500).json({ error: err.message, requestId });
};

export { logger, injectMetadata, errorMiddleware };
