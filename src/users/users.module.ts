import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Comment } from 'src/comments/comments.model';
import { Equipment } from 'src/equipments/equipments.model';
import { Order } from 'src/orders/order.model';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Equipment, Order, Comment]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
