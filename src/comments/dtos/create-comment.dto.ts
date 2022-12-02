import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentsDto {
  @ApiProperty({ example: '2', description: 'Equipment`s ID' })
  @IsNotEmpty()
  @IsNumber()
  equipment_id: number;

  @ApiProperty({ example: '2', description: 'User`s ID' })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: 'Good', description: 'Comment for equipment' })
  @IsNotEmpty()
  @IsString()
  comment: string;

  @ApiProperty({ example: '5', description: 'Rating for rentaling' })
  @IsNotEmpty()
  @IsNumber()
  rating: number;
}
