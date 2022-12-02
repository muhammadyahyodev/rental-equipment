import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model';
import { AuthModule } from './auth/auth.module';
import { EquipmentsModule } from './equipments/equipments.module';
import { Equipment } from './equipments/equipments.model';
import { CommentsModule } from './comments/comments.module';
import { CommentsController } from './comments/comments.controller';
import { Comment } from './comments/comments.model';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/order.model';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_POST),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Equipment, Comment, Order],
      autoLoadModels: true,
      logging: false,
    }),
    UsersModule,
    AuthModule,
    EquipmentsModule,
    CommentsModule,
    OrdersModule,
    FilesModule,
  ],
  controllers: [CommentsController],
})
export class AppModule {}
