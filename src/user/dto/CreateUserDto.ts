import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsNotEmpty({ message: 'Name is required' })
  nome: string;

  @IsNotEmpty({ message: 'Password is required' })
  senha: string;

  @IsOptional()
  @IsString()
  telefone?: string;
}
