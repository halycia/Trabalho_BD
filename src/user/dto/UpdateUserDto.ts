import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  senha?: string;

  @IsOptional()
  @IsString()
  telefone: string;
}
