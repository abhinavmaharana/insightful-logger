# insightful-logger

A versatile logger for Node.js applications with added insights.

## Table of Contents

- [insightful-logger](#insightful-logger)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
      - [Logger](#logger)
      - [Injecting Metadata](#injecting-metadata)
      - [Error Middleware](#error-middleware)
  - [API](#api)
  - [Examples](#examples)
    - [JavaScript Implementation](#javascript-implementation)
    - [TypeScript Implementation](#typescript-implementation)
  - [Contributing](#contributing)
  - [GitHub Repository](#github-repository)
  - [License](#license)

## Installation

```npm install insightful-logger```

## Usage

#### Logger

```

const { logger } = require('insightful-logger');

logger.info('This is an info message');
logger.warn('This is a warning message');

```

#### Injecting Metadata

```

const { injectMetadata } = require('insightful-logger');

const metadataLogger = injectMetadata({ customField: 'value' });
metadataLogger.info('Log with additional metadata');

```

#### Error Middleware

```

const { errorMiddleware } = require('insightful-logger');

const error = new Error('Test error');
const req = { originalUrl: '/test', method: 'GET', ip: '127.0.0.1' };
const res = { status: (code) => ({ json: (data) => console.log(code, data) }) };
const next = () => {};

errorMiddleware(error, req, res, next);

```

## API

`logger`

The main logger instance created with Winston.

`injectMetadata(additionalMetadata)`

Function to inject additional metadata into a logger instance.

`errorMiddleware(err, req, res, next)`

Error middleware for logging errors in Express.js applications.

## Examples

### JavaScript Implementation

```
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

```

### TypeScript Implementation

```

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

```

## Contributing

Feel free to contribute by opening issues or submitting pull requests.

1) Fork the repository
2) Create your feature branch: git checkout -b feature/new-feature
3) Commit your changes: git commit -am 'Add new feature'
4) Push to the branch: git push origin feature/new-feature
5) Submit a pull request

## GitHub Repository

[GitHub Repository](https://github.com/abhinavmaharana/insightful-logger)

## License

This project is licensed under the ISC License.