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
import { Order } from 'src/orders/order.model';
import { User } from 'src/users/users.model';

interface EquipmentCreationAttrs {
  name: string;
  price: number;
  image: string;
}

@Table({ tableName: 'equipments' })
export class Equipment extends Model<Equipment, EquipmentCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 5
  })
  price: number;

  @Column({
    type: DataType.STRING,
  })
  image: string;

  @Column({
    type: DataType.INTEGER,
  })
  total_rating: number;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  user_id: number;

  @BelongsTo(() => User)
  users: User[];

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;
}
