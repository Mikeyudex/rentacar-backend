import { Catch, ArgumentsHost, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    console.error('🔴 Excepción atrapada globalmente:', exception);
    response.status(exception?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR).json(exception);
  }
}