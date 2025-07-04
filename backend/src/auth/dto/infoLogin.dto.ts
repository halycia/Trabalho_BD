import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class InfoLogin {
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    senha: string; 
}
