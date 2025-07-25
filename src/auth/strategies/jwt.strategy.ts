import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadToken } from '../models/token.model';
import { ConfigType } from '@nestjs/config';
import config from '../../config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(@Inject(config.KEY) configService: ConfigType<typeof config>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.jwtSecret,
        });
    }

    validate(payload: PayloadToken) {
        return payload;
    }
}
