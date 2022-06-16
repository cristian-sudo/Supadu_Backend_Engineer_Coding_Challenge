import { Injectable } from '@nestjs/common';
import {
  Connection,
  getConnection,
} from 'typeorm';
import config from '../../Config';

@Injectable()
export default class ConnectionProvider {
  async getConnection(): Promise<Connection> {
    return getConnection(config.environment === 'dev' ? 'default' : config.environment);
  }
}
