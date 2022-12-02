import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Equipment } from 'src/equipments/equipments.model';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { Order } from './order.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private readonly orderRepository: typeof Order,
    @InjectModel(Equipment)
    private readonly equipmentRepostory: typeof Equipment,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const order = await this.orderRepository.create(createOrderDto);
    const equipment = await this.equipmentRepostory.findOne({
      where: { id: order.equipment_id },
    });

    const start = order.start_date.getTime();
    const end = order.finish_date.getTime();
    const result = new Date(end - start).getHours() * equipment.price;
    order.total_price = result;
    await order.save();
    return order;
  }

  async getAllOrders() {
    const orders = await this.orderRepository.findAll({
      include: { all: true },
    });
    return orders;
  }

  async getOneOrder(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return order;
  }

  async updateOrder(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.update(updateOrderDto, {
      where: { id },
      returning: true,
    });

    return order[0][1];
  }

  async deleteOrder(id: number) {
    const order = await this.orderRepository.destroy({ where: { id } });
    if (!order) {
      throw new HttpException(
        'Order with this ID not found ',
        HttpStatus.NOT_FOUND,
      );
    }

    return order;
  }
}
