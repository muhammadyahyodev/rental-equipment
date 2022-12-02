import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ActivateUserDto {
  @ApiProperty({ example: '1', description: "User's id" })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    example: 'true',
    description: "User's is activate or deactivate",
  })
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
