import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ActivateUserDto } from './dtos/activate-user.dto';
import { CreateUserDto } from './dtos/createUserDto.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './users.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = await this.userRepository.create(createUserDto);
    await newUser.save();
    return newUser;
  }

  async getAllUsers() {
    const allUsers = await this.userRepository.findAll({
      include: { all: true },
    });
    return allUsers;
  }

  async getOneUser(id: number) {
    const user = await this.userRepository.findByPk(id, {
      include: { all: true },
    });
    if (!user) {
      throw new HttpException(
        'User with this ID not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async updateUser(id: number, userData: UpdateUserDto) {
    const hashedPassword = await bcrypt.hash(userData.password, 7);

    const payload = { ...userData, password: hashedPassword };
    const user = await this.userRepository.update(payload, {
      where: { id },
      returning: true,
    });
    if (!user) {
      throw new HttpException('User not updated', HttpStatus.FORBIDDEN);
    }
    return user;
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.destroy({ where: { id } });
    if (!user) {
      throw new HttpException(
        'User with this ID not found or already deleted',
        HttpStatus.NOT_FOUND,
      );
    }
    return `Ok. Deleted`;
  }

  async activeUser(activateUserDto: ActivateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id: activateUserDto.userId },
    });
    user.is_active = activateUserDto.active;

    return { message: `User is ${activateUserDto.active}` };
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    // if (!user) {
    //   throw new HttpException(
    //     'User with this email not found',
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
    return user;
  }
}
