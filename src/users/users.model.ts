import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UsersCreationAttrs {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  location: string;
  is_admin: boolean;
  is_active: boolean;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UsersCreationAttrs> {
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
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone_number: string;

  @Column({
    type: DataType.STRING,
  })
  location: string;

  @Column({
    type: DataType.STRING,
  })
  token: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_admin: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;
}
