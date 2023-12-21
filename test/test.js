const { logger, injectMetadata, errorMiddleware } = require('../dist/insightful-logger');

// Basic Logging
logger.info('This is an info message');
logger.warn('This is a warning message');
logger.error('This is an error message');

// Test metadata injection
const metadataLogger = require('winston').createLogger({
    format: require('winston').format.combine(
      injectMetadata({ customField: 'value' }),
      require('winston').format.simple()
    )
  });
  metadataLogger.info('Log with additional metadata');
  
  // Test error middleware
  const error = new Error('Test error');
  const req = { originalUrl: '/test', method: 'GET', ip: '127.0.0.1' };
  const res = { status: (code) => ({ json: (data) => console.log(code, data) }) };
  const next = () => {};
  errorMiddleware(error, req, res, next);