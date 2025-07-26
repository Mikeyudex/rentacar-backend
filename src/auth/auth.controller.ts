import { BadRequestException, Controller, Options, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { getAllowedOrigins } from '../common/utils/cors-origin.utils';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { IUser } from 'src/user/schemas/user.schema';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }


    @Options('login')
    handleOptions(@Req() req: Request, @Res() res: Response) {
        const allowedOrigins = getAllowedOrigins();
        const origin = req.headers.origin;

        if (origin && allowedOrigins.includes(origin)) {
            res.set({
                'Access-Control-Allow-Origin': origin,
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Allow-Credentials': 'true',
            });
            return res.status(204).send();
        }

        return res.status(403).send('Origin not allowed');
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Req() req: any | Request) {
        const user = req?.user as IUser;
        return this.authService.generateJwt(user);
    }

    @Post('validatetoken')
    validatetoken(@Req() req: any | Request) {
        const token = req?.headers?.authorization;
        if (!token) throw new BadRequestException({
            statusCode: 400,
            message: 'Token no encontrado',
            error: 'Token no encontrado',
        });

        if (!token.startsWith('Bearer ')) throw new BadRequestException({
            statusCode: 400,
            message: 'Token no válido',
            error: 'Token no válido',
        });

        return this.authService.validateToken(token.split(' ')[1]);
    }
}