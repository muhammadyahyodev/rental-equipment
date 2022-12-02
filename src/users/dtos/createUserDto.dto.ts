import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'User', description: 'Username' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'user@gmail.com', description: `User's email` })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '12345', description: "User's password" })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({
    example: '+998 90 123 45 67',
    description: "Users's phone number",
  })
  @IsNotEmpty()
  @IsString()
  readonly phone_number: string;

  @ApiProperty({ example: 'Chicago', description: "User's location" })
  @IsString()
  readonly location: string;

  @ApiProperty({ example: 'Chicago', description: "User's location" })
  @IsString()
  readonly token: string;

  @ApiProperty({ example: 'true', description: "User's is admin?" })
  @IsBoolean()
  readonly is_admin: boolean;

  @ApiProperty({ example: 'false', description: "User's is active?" })
  @IsBoolean()
  readonly is_active: boolean;
}
