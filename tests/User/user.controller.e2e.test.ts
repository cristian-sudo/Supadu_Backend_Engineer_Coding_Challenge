import { HttpStatus, INestApplication } from '@nestjs/common';
import { matchers } from 'jest-json-schema';
import { Connection } from 'typeorm';
import UserModule from '../../src/Module/User/user.module';
import User from '../../src/Entity/User/user.entity';
import ApiTestCase from '../Setup/Api/api.test.case';
import TestDbService from '../Setup/Service/test.db.service';
import JsonSchemaLoader from '../../src/Schema/json-schema-loader';

expect.extend(matchers);

const getUsersRoute: string = '/api/user';
const createUserRoute: string = '/api/user/register';
const editUserRoute: string = '/api/user/edit';
const deleteUserRoute: string = '/api/user/delete';

describe('User', () => {
  let app: INestApplication;
  let connection: Connection;

  const schemaLoader: JsonSchemaLoader = new JsonSchemaLoader();
  let readUserSchema: object;

  beforeAll(async () => {
    app = await ApiTestCase.setUp(app, [UserModule]);
    connection = await TestDbService.createConnection();

    readUserSchema = await schemaLoader.getSchemaByName('User', 'read.user');
  });

  // Getting User
  test('it_returns_users', async () => {
    const response = await ApiTestCase.jsonGetRequest(app, getUsersRoute);

    expect(response.statusCode).toBe(HttpStatus.OK);
  });

  test('it_returns_user_with_valid_id', async () => {
    const user = await ApiTestCase.createApiUser(connection);
    const response = await ApiTestCase.jsonGetRequest(app, `${getUsersRoute}/${user.getId()}`);

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toMatchSchema(readUserSchema);
  });

  test('it_fails_with_invalid_id', async () => {
    const response = await ApiTestCase.jsonGetRequest(app, `${getUsersRoute}/14124`);
    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
  });

  // Creating User
  test('it_creates_user_with_valid_data', async () => {
    const response = await ApiTestCase.jsonPostRequest(
      app,
      createUserRoute,
      {
        email: 'testuser@example.com',
        firstName: 'firstName',
        lastName: 'Surname',
      },
    );

    expect(response.statusCode).toBe(HttpStatus.CREATED);
    expect(response.body).toMatchSchema(readUserSchema);
  });

  test('it_fails_with_no_body', async () => {
    const response = await ApiTestCase.jsonPostRequest(app, createUserRoute, {});

    expect(response.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  // Edit User
  test('it_edits_user_with_valid_data', async () => {
    const user = await ApiTestCase.createApiUser(connection);

    const response = await ApiTestCase.jsonPutRequest(
      app,
      `${editUserRoute}/${user.getId()}`,
      {
        email: 'theWolf@gmail.com',
        firstName: 'Emilio',
        lastName: 'Barzini',
      },
    );
    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toMatchSchema(readUserSchema);
    expect(response.body.email === user.getEmail()).toBeFalsy();
    expect(response.body.firstName === user.getFirstName()).toBeFalsy();
    expect(response.body.lastName === user.getLastName()).toBeFalsy();
  });

  // Delete User
  test('it_deletes_user_with_valid_body', async () => {
    const user = await ApiTestCase.createApiUser(connection);

    const response = await ApiTestCase.jsonPostRequest(
      app,
      `${deleteUserRoute}/${user.getId()}`,
    );

    expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
  });

  afterEach(async () => {
    await connection.getRepository(User).delete({});
  });

  afterAll(async () => {
    await TestDbService.closeConnection();
    await app.close();
  });
});
