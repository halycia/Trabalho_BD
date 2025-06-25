import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class InfoLogin {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    senha: string; 
}
