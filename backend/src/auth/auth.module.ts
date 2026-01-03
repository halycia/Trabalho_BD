import { Module, forwardRef } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        ConfigModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '24h' },
        }),
        forwardRef(() => UserModule),
    ],
    providers: [
        AuthService, 
        AuthGuard,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
    controllers: [AuthController],
    exports: [AuthService, AuthGuard],
})
export class AuthModule { }
