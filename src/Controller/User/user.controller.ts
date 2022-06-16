import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseInterceptors,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import UserRepository from '../../Repository/User/user.repository';
import UserDto from '../../Dto/User/user.dto';
import UserHandler from '../../Service/Handler/User/user.handler';
import User from '../../Entity/User/user.entity';

@ApiTags('User')
@Controller('api/user')
export default class UserController {
  constructor(
    private userRepository: UserRepository,
    private userHandler: UserHandler,
  ) {
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') id: number): Promise<User> {
    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user!;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: UserDto): Promise<User> {
    return this.userHandler.registerUser(dto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put('/edit/:id')
  @HttpCode(HttpStatus.OK)
  async edit(@Req() req: Request, @Body() dto: UserDto, @Param('id') id: number): Promise<User> {
    return this.userHandler.editUser(dto, id);
  }

  @Post('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Req() req: Request, @Param('id') id: number): Promise<User> {
    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return this.userHandler.deleteUser(user!);
  }
}
