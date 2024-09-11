import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');
  use(req: any, res: any, next: () => void) {
    const { method, originalUrl } = req;
    const start = Date.now();
    res.on('finish', () => {
      const { statusCode } = res;
      const processingTime = Date.now() - start;
      const logMessage = `${method} ${originalUrl} ${statusCode} - ${processingTime}ms`;

      if (statusCode >= 500) {
        this.logger.error(logMessage);
      } else if (statusCode >= 400) {
        this.logger.warn(logMessage);
      } else {
        this.logger.log(logMessage);
      }
    });

    next();
  }
}
