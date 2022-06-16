import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Connection } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import User from '../../../src/Entity/User/user.entity';

const ApiTestCase = {
  async setUp(nestApp: INestApplication, modules: any[]): Promise<INestApplication> {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: modules,
    }).compile();

    let app: INestApplication = nestApp;
    app = testingModule.createNestApplication();
    await app.init();

    return app;
  },

  async jsonPostRequest(app: INestApplication, route: string, data: object = {}, headers: object = {}): Promise<any> {
    return request(app.getHttpServer())
      .post(route)
      .set(headers)
      .send(data);
  },

  async jsonGetRequest(app: INestApplication, route: string, headers: object = {}): Promise<any> {
    return request(app.getHttpServer())
      .get(route)
      .set(headers);
  },

  async jsonPutRequest(app: INestApplication, route: string, data: object = {}, headers: object = {}): Promise<any> {
    return request(app.getHttpServer())
      .put(route)
      .set(headers)
      .send(data);
  },

  async createApiUser(
    connection: Connection,
  ): Promise<User> {
    const user = new User('admin@gmail.com', 'firstName', 'LastName');
    await connection.getRepository(User).save(user);

    return user;
  },

};

export default ApiTestCase;
