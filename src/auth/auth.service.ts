import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dtos/login.dto';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import { CreateUserDto } from 'src/users/dtos/createUserDto.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    const tokexBox = this.generateToken(user);

    user.token = (await tokexBox).token;
    user.save();
    return user;
  }

  async registration(userDto: CreateUserDto) {
    const condidate = await this.usersService.getUserByEmail(userDto.email);
    if (condidate) {
      throw new HttpException('This user exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 7);

    const user = await this.usersService.createUser({
      ...userDto,
      password: hashedPassword,
    });
    const tokenBox = await this.generateToken(user);

    user.token = tokenBox.token;
    await user.save();
    return tokenBox;
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(loginDto: LoginDto) {
    const user = await this.usersService.getUserByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException({
        messsage: 'Email or password incorrect',
      });
    }

    const validPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (user && validPassword) {
      return user;
    }
    throw new UnauthorizedException('Email or Password incorrect');
  }
}
