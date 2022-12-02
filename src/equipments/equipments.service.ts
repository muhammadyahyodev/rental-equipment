import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { AddEquipmentDto } from './dtos/add-equipment.dto';
import { UpdateEquipmentDto } from './dtos/update-equipment.dto';
import { Equipment } from './equipments.model';

@Injectable()
export class EquipmentsService {
  constructor(
    @InjectModel(Equipment)
    private readonly equipmentRepository: typeof Equipment,
    private readonly fileService: FilesService,
  ) {}

  async create(createEquipmentDto: AddEquipmentDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const post = await this.equipmentRepository.create({
      ...createEquipmentDto,
      image: fileName,
    });

    return post;
  }

  async getAllEquipments() {
    const equipments = await this.equipmentRepository.findAll({
      include: { all: true },
    });
    return equipments;
  }
  async addEquipment(addEquipmentDto: AddEquipmentDto) {
    const equipment = await this.equipmentRepository.create(addEquipmentDto);

    if (!equipment) {
      throw new HttpException(
        'Error adding hardware to database',
        HttpStatus.BAD_REQUEST,
      );
    }

    return equipment;
  }

  async getOneEquipment(id: number) {
    const equipment = await this.equipmentRepository.findByPk(id, {
      include: { all: true },
    });
    if (!equipment) {
      throw new HttpException(
        'Equipment with this ID not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return equipment;
  }

  async deleteEquipment(id: number) {
    const equipment = await this.equipmentRepository.destroy({ where: { id } });
    if (!equipment) {
      throw new HttpException(
        'With this ID equipment not found ',
        HttpStatus.NOT_FOUND,
      );
    }
    return equipment;
  }

  async updateEquipment(id: number, userData: UpdateEquipmentDto) {
    const user = await this.equipmentRepository.update(userData, {
      where: { id },
    });

    if (!user) {
      throw new HttpException('Equipment not updated', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
