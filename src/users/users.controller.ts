import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ActivateUserDto } from './dtos/activate-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get one user' })
  @ApiResponse({ status: 200, type: [User] })
  @Get(':id')
  getOneUser(@Param('id') id: number) {
    return this.userService.getOneUser(id);
  }

  // @ApiOperation({ summary: 'Create users' })
  // @ApiResponse({ status: 201, type: [User] })
  // @Post()
  // createUser(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.createUser(createUserDto);
  // }

  @ApiOperation({ summary: 'Update users' })
  @ApiResponse({ status: 200, type: [User] })
  @Put(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, type: [User] })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }

  @ApiOperation({ summary: 'Activate user' })
  @ApiResponse({ status: 200, type: [User] })
  @Post('activate')
  activate(@Body() activateUserDto: ActivateUserDto) {
    return this.userService.activeUser(activateUserDto);
  }
}
