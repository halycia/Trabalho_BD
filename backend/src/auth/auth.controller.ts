import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { InfoLogin } from './dto/infoLogin.dto';
import { LoginDocs } from './auth.swagger';
import {Public} from './decorators/isPublic.decorator'; 
@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @LoginDocs()
    @Public()
    @Post('login')
    async login(@Body() infoLogin: InfoLogin) {
        return await this.authService.login(infoLogin);
    }
}
