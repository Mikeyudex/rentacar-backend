import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {

    constructor(private readonly authService: AuthService) {
        super({ usernameField: 'email', passwordField: 'password' });
    }

    async validate(email: string, password: string) {
        const user = await this.authService.validateUser(email, password);

        if (!user) {
            throw new UnauthorizedException({
                message: 'Credenciales inválidas',
                code: 401,
                error: 'Credenciales inválidas',
            });
        }
        return user;
    }

}