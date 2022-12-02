import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddEquipmentDto } from './dtos/add-equipment.dto';
import { UpdateEquipmentDto } from './dtos/update-equipment.dto';
import { Equipment } from './equipments.model';
import { EquipmentsService } from './equipments.service';

@Controller('equipments')
export class EquipmentsController {
  constructor(private readonly equipmentService: EquipmentsService) {}

  @ApiOperation({ summary: 'Get all equipments' })
  @ApiResponse({ status: 200, type: [Equipment] })
  @Get()
  getAllEquipment() {
    return this.equipmentService.getAllEquipments();
  }

  @ApiOperation({ summary: 'Get one equipments' })
  @ApiResponse({ status: 200, type: [Equipment] })
  @Get(':id')
  getEquipment(@Param('id') id: number) {
    return this.equipmentService.getOneEquipment(id);
  }

  @ApiOperation({ summary: 'Create equipment' })
  @ApiResponse({ status: 200, type: [Equipment] })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createEquipment(
    @Body() createEquipmentDto: AddEquipmentDto,
    @UploadedFile() image,
  ) {
    return this.equipmentService.create(createEquipmentDto, image);
  }

  @ApiOperation({ summary: 'Delete equipment' })
  @ApiResponse({ status: 200, type: [Equipment] })
  @Delete(':id')
  deleteEquipment(@Param('id') id: number) {
    return this.equipmentService.deleteEquipment(id);
  }

  @ApiOperation({ summary: 'Update equipment' })
  @ApiResponse({ status: 200, type: [Equipment] })
  @Put(':id')
  update(@Param('id') id: number, @Body() data: UpdateEquipmentDto) {
    return this.equipmentService.updateEquipment(id, data);
  }
}
