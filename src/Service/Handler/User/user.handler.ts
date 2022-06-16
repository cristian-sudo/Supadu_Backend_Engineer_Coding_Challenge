import {
  Injectable, UnprocessableEntityException,
} from '@nestjs/common';
import ConnectionProvider from '../../../Provider/Connection/connection.provider';
import User from '../../../Entity/User/user.entity';
import UserDto from '../../../Dto/User/user.dto';

@Injectable()
export default class UserHandler {
  constructor(private connection: ConnectionProvider) {}

  async registerUser(dto: UserDto): Promise<User> {
    const em = await this.connection.getConnection();

    const user = new User(
      dto.email,
      dto.firstName,
      dto.lastName,
      new Date(),
    );

    return em.getRepository(User).save(user);
  }

  async editUser(dto: UserDto, id:number): Promise<User> {
    const em = await this.connection.getConnection();
    const user:User | undefined = await em.getRepository(User).findOne({ where: { id } });

    if (!user) {
      throw new UnprocessableEntityException();
    }
    user.setEmail(dto.email);
    user.setFirstName(dto.firstName);
    user.setLastName(dto.lastName);
    await em.getRepository(User).save(user);

    return user;
  }

  async deleteUser(user: User): Promise<User> {
    const em = await this.connection.getConnection();

    return em.getRepository(User).remove(user);
  }
}
