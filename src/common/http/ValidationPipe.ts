import {
  ValidationPipe,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const validationPipe = new ValidationPipe({
  transform: true,
  stopAtFirstError: true,
  exceptionFactory: (validationErrors: ValidationError[] = []) => {
    const formatErrors = (
      errors: ValidationError[],
      parentField: string = '',
    ) => {
      return errors.reduce((acc, error) => {
        const fieldPath = parentField
          ? `${parentField}.${error.property}`
          : error.property;

        // If there are no children, it's a regular validation error
        if (!error.children || error.children.length === 0) {
          acc.push({
            field: fieldPath,
            message: Object.values(error.constraints || {})[0],
          });
        } else {
          // If there are children, recursively process the nested errors
          acc = acc.concat(formatErrors(error.children, fieldPath));
        }
        return acc;
      }, []);
    };

    const formattedErrors = formatErrors(validationErrors);

    return new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Validation failed',
      errors: formattedErrors,
    });
  },
});
