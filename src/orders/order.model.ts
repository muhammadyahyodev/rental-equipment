import { NOW } from 'sequelize';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Equipment } from 'src/equipments/equipments.model';
import { User } from 'src/users/users.model';

interface OrderCreationAttrs {
  equipment_id: number;
  user_id: number;
}

@Table({ tableName: 'orders' })
export class Order extends Model<Order, OrderCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Equipment)
  @Column({
    type: DataType.INTEGER,
  })
  equipment_id: number;

  @BelongsTo(() => Equipment)
  equipments: Equipment[];

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  user_id: number;

  @BelongsTo(() => User)
  users: User[];

  @Column({
    type: DataType.DATE,
    defaultValue: NOW,
  })
  start_date: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: NOW,
  })
  finish_date: Date;

  @Column({
    type: DataType.INTEGER,
  })
  total_price: number;
}
