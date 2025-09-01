import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { AppDataSource } from '../src/data-source.js';
import app from '../src/index.js';
import { User } from '../src/user.entiti.js';
import { faker } from '@faker-js/faker';

describe('User API', () => {
  let testUserId: number;

  beforeAll(async () => {
    AppDataSource.initialize().then(() => {}).catch(err => console.error('no se puede:'));
  });

  afterAll(async () => {
    if (testUserId) {
      await AppDataSource.getRepository(User).delete(testUserId);
    }
    await AppDataSource.destroy();
  });

  it('should register update the field user id:7 name (PATCH /api/users/7/field)', async () => {
    const newFieldName = faker.person.firstName();

    const response = await request(app)
      .patch("/api/users/7/field")
      .send(newFieldName)
      .expect(201);

    expect(response.body).toHaveProperty('id');

  })

  it('should register a new user (POST /api/users/register)', async () => {
    const userData = {
      name: faker.person.fullName(),
      password: faker.internet.password(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      address: faker.location.streetAddress()
    };

    const response = await request(app)
      .post('/api/users/register')
      .send(userData)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe(userData.email);
    expect(response.body.password).toBeUndefined(); // No debe devolver la contraseña

    testUserId = response.body.id;
  });

  it('should get all users (GET /api/users)', async () => {
    const response = await request(app)
      .get('/api/users')
      .expect(200);

    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });
});