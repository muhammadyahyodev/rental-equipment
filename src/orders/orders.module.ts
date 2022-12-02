import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Equipment } from 'src/equipments/equipments.model';
import { Order } from './order.model';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [SequelizeModule.forFeature([Order, Equipment])],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
