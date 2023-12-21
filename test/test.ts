import { logger, injectMetadata, errorMiddleware } from '../src/insightful-logger';
import * as winston from 'winston';

// Basic Logging
logger.info('This is an info message');
logger.warn('This is a warning message');
logger.error('This is an error message');

// Test metadata injection
const metadataLogger = winston.createLogger({
    format: winston.format.combine(
      injectMetadata({ customField: 'value' }),
      winston.format.simple()
    )
  });
metadataLogger.info('Log with additional metadata');
  
// Test error middleware
const error = new Error('Test error');
const req: any = { originalUrl: '/test', method: 'GET', ip: '127.0.0.1' };
const res: any = { status: (code: number) => ({ json: (data: any) => console.log(code, data) }) };
const next = () => {};
errorMiddleware(error, req, res, next);