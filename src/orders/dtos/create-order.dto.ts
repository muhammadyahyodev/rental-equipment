import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsDate } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: '2', description: 'Equipment`s ID' })
  @IsNotEmpty()
  @IsNumber()
  equipment_id: number;

  @ApiProperty({ example: '2', description: 'User`s ID' })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: '12-03-2021', description: 'Start date' })
  @IsNotEmpty()
  @IsDate()
  state_date: Date;

  @ApiProperty({ example: '12-03-2022', description: 'Finish date' })
  @IsNotEmpty()
  @IsDate()
  finish_date: Date;

  @ApiProperty({ example: '12', description: 'Total price' })
  @IsNotEmpty()
  @IsNumber()
  total_price: number;
}
