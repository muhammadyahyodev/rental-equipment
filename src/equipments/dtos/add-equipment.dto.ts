import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddEquipmentDto {
  @ApiProperty({ example: 'Saw', description: 'Construction tool' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: '5 000',
    description: 'Price of the construction tool',
  })
  // @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @ApiProperty({
    example: 'Image',
    description: 'Picture of a construction tools',
  })
  @IsNotEmpty()
  @IsString()
  readonly image: string;

  @ApiProperty({
    example: '150 000',
    description: 'Total price',
  })
  @IsNumber()
  readonly total_rating: number;

  @ApiProperty({
    example: '5',
    description: "Users's Id",
  })
  @IsNotEmpty()
  @IsNumber()
  readonly user_id: number;

  @ApiProperty({
    example: 'Used for cutting trees',
    description: 'used for cutting trees',
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({
    example: 'true',
    description: 'User active or deactive',
  })
  @IsBoolean()
  readonly is_active: boolean;
}
