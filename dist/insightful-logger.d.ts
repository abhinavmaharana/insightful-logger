declare module 'insightful-logger' {
    import { Logger } from 'winston';
  
    interface AdditionalMetadata {
      [key: string]: any;
    }
  
    interface ErrorMiddlewareOptions {
      status?: number;
      message: string;
    }
  
    const logger: Logger;
    function injectMetadata(additionalMetadata: AdditionalMetadata): any;
    function errorMiddleware(
      err: ErrorMiddlewareOptions,
      req: any,
      res: any,
      next: any
    ): void;
  
    export { logger, injectMetadata, errorMiddleware };
  }
  