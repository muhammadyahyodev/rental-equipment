import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';
import { EquipmentsController } from './equipments.controller';
import { Equipment } from './equipments.model';
import { EquipmentsService } from './equipments.service';

@Module({
  imports: [SequelizeModule.forFeature([Equipment]), FilesModule],
  controllers: [EquipmentsController],
  providers: [EquipmentsService],
  exports: [EquipmentsService],
})
export class EquipmentsModule {}
