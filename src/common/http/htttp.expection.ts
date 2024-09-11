import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    // Extract the message from the exception
    const message = exception.message || null;

    // Check if it's a BadRequestException (i.e., validation error)
    if (exception instanceof BadRequestException) {
      const exceptionResponse = exception.getResponse();

      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exceptionResponse['message'] || 'Validation failed',
        errors: exceptionResponse['errors'] || [], // Include validation errors if present
      });
    } else {
      // Handle other HttpExceptions
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: message, // Generic message for other HttpExceptions
      });
    }
  }
}
