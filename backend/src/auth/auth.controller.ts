import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { InfoLogin } from './dto/infoLogin.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() InfoLogin: InfoLogin) {
        try {
            return await this.authService.login(InfoLogin);
        } catch (error) {
            throw new UnauthorizedException('Credenciais inválidas');
        }
    }
}
