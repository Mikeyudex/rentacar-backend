import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        // Evita aplicar la estrategia para solicitudes preflight
        if (request.method === 'OPTIONS') {
            console.log('[LocalAuthGuard] Preflight detected, bypassing auth');
            return true;
        }

        return super.canActivate(context);
    }
}