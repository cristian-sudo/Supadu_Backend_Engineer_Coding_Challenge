import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail, IsString,
} from 'class-validator';

export default class UserDto {
  @ApiProperty()
  @IsEmail()
    email!: string;

  @ApiProperty()
  @IsString()
    firstName!: string;

  @ApiProperty()
  @IsString()
    lastName!: string;
}
