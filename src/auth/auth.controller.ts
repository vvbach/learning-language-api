import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { FirebaseAuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: FirebaseAuthService) {}

    @Post('register')
    async register(@Body() body: RegisterDto) {
        return this.authService.register(body.email, body.password);
    }

    @Get('verify')
    async verify(@Headers('Authorization') authHeader: string) {
        const token = authHeader?.replace('Bearer ', '');
        return this.authService.verify(token);
    }
}
