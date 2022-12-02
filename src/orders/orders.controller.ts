import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { Order } from './order.model';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @ApiOperation({ summary: 'Create order' })
  @ApiResponse({ status: 201, type: [Order] })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, type: [Order] })
  @Get()
  getAll() {
    return this.orderService.getAllOrders();
  }

  @ApiOperation({ summary: 'Get one order' })
  @ApiResponse({ status: 200, type: [Order] })
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.orderService.getOneOrder(id);
  }

  @ApiOperation({ summary: 'Update one order' })
  @ApiResponse({ status: 200, type: [Order] })
  @Put(':id')
  update(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.updateOrder(id, updateOrderDto);
  }

  @ApiOperation({ summary: 'Delete order' })
  @ApiResponse({ status: 200, type: [Order] })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.orderService.deleteOrder(id);
  }
}
