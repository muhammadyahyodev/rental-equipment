import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsEmail } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'user@gmail.com', description: `User's email` })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Email was entered incorrectly' })
  readonly email: string;

  @ApiProperty({ example: 'qwerty123', description: `User's password` })
  @IsString({ message: 'Password must be a string' })
  @MinLength(4, {
    message: 'Password must be longer than 4 characters',
  })
  readonly password: string;
}
