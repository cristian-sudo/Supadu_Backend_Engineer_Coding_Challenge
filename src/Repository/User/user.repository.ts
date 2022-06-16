import { Injectable } from '@nestjs/common';
import ConnectionProvider from '../../Provider/Connection/connection.provider';
import User from '../../Entity/User/user.entity';

@Injectable()
export default class UserRepository {
  constructor(private connection: ConnectionProvider) {}

  async getAllUsers(): Promise<User[]> {
    const em = await this.connection.getConnection();

    return em.getRepository(User).find();
  }

  async getUserById(id: number): Promise<User | undefined> {
    const em = await this.connection.getConnection();

    return em.getRepository(User).findOne(id);
  }
}
