import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'User', description: 'Username' })
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'user@gmail.com', description: `User's email` })
  @IsOptional()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '12345', description: "User's password" })
  @IsOptional()
  @IsString()
  readonly password: string;

  @ApiProperty({
    example: '+998 90 123 45 67',
    description: "Users's phone number",
  })
  @IsOptional()
  @IsString()
  readonly phone_number: string;

  @ApiProperty({ example: 'Chicago', description: "User's location" })
  @IsOptional()
  @IsString()
  readonly location: string;

  @ApiProperty({ example: 'true', description: "User's is admin?" })
  @IsOptional()
  @IsBoolean()
  readonly is_admin: boolean;

  @ApiProperty({ example: 'false', description: "User's is active?" })
  @IsOptional()
  @IsBoolean()
  readonly is_active: boolean;
}
