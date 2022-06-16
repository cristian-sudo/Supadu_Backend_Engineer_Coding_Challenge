import { Module } from '@nestjs/common';
import UserController from '../../Controller/User/user.controller';
import ConnectionProvider from '../../Provider/Connection/connection.provider';
import UserRepository from '../../Repository/User/user.repository';
import UserHandler from '../../Service/Handler/User/user.handler';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserRepository,
    UserHandler,
    ConnectionProvider,
  ],
  exports: [UserRepository, ConnectionProvider],
})

export default class UserModule {
}
