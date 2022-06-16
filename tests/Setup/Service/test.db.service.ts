import 'dotenv/config';
import {
  Connection, createConnection, getConnection, getConnectionOptions,
} from 'typeorm';

const TestDbService = {
  async createConnection(): Promise<Connection> {
    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);

    await createConnection(connectionOptions);

    return getConnection('test');
  },

  async closeConnection() {
    await getConnection('test').close();
  },
};
export default TestDbService;
