import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandModule } from 'nestjs-command';
import UserModule from './Module/User/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CommandModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export default class AppModule {}
