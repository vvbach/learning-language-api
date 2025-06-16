import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { FirebaseAuthService } from './auth.service';


@Injectable()
export class FirebaseAuthGuard implements CanActivate {
    constructor(private readonly firebaseAuthService: FirebaseAuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader?.startsWith('Bearer ')) {
            throw new UnauthorizedException('No bearer token provided');
        }

        const idToken = authHeader.split('Bearer ')[1];
        try {
            const decodedToken = await this.firebaseAuthService.verify(idToken);
            request.user = decodedToken;
            return true;
        } catch (err) {
            throw new UnauthorizedException('Invalid Firebase ID token');
        }
    }
}
