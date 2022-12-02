import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dtos/createUserDto.dto';
import { User } from 'src/users/users.model';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, type: User })
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiOperation({ summary: 'Registration users' })
  @ApiResponse({ status: 201, type: User })
  @Post('registration')
  registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto);
  }
}
