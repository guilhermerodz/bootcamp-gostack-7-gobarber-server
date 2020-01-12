import request from 'supertest';
import bcrypt from 'bcryptjs';

import factory from '../factory';
import truncate from '../util/truncate';
import app from '../../src/app';
import database from '../../src/database';
import cache from '../../src/lib/Cache';

describe('User', () => {
  beforeEach(truncate);

  it('should encrypt user password during register', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('should be able to register', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register duplicated emails', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });
});
