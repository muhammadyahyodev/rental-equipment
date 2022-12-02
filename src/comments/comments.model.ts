import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Equipment } from 'src/equipments/equipments.model';
import { User } from 'src/users/users.model';

interface CommnetsCreationAttrs {
  equipment_id: number;
  user_id: number;
}

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment, CommnetsCreationAttrs> {
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
    allowNull: true,
  })
  equipment_id: number;

  @BelongsTo(() => Equipment)
  equipments: Equipment[];

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  user_id: number;

  @BelongsTo(() => User)
  users: User[];

  @Column({
    type: DataType.STRING,
  })
  comment: string;

  @Column({
    type: DataType.INTEGER,
  })
  rating: number;
}
