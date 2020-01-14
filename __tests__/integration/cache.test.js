import { startOfHour, setHours, addDays } from 'date-fns';
import request from 'supertest';

import factory from '../factory';
import truncate from '../util/truncate';
import app from '../../src/app';
import Cache from '../../src/lib/Cache';

let userData;

function getCachedAppointments() {
  const cacheKey = `user:${userData.id}:appointments:1`; // user:${userId}:appointments:${page}
  return Cache.get(cacheKey);
}

export default () =>
  describe('Cache', () => {
    beforeAll(truncate);

    it('should cache data', async () => {
      const user = await factory.attrs('User');

      const signupResponse = await request(app)
        .post('/users')
        .send(user);

      const signinResponse = await request(app)
        .post('/sessions')
        .send({
          email: user.email,
          password: user.password,
        });

      userData = {
        id: signupResponse.body.id,
        name: user.name,
        email: user.email,
        password: user.password,
        authorization: ['authorization', `bearer ${signinResponse.body.token}`],
      };

      const uncached = (await request(app)
        .get('/appointments')
        .set(...userData.authorization)
        .send()).body;

      const cached = await getCachedAppointments();

      expect(cached).not.toBeNull();
      expect(cached).not.toBeUndefined();
      expect(JSON.stringify(cached)).toBe(JSON.stringify(uncached));
    });

    it('should invalidate cache', async () => {
      const provider = await factory.attrs('User', {
        provider: true,
      });

      const providerSignup = await request(app)
        .post('/users')
        .send(provider);

      const provider_id = providerSignup.body.id;

      const oldCache = await getCachedAppointments();

      await request(app)
        .post('/appointments')
        .set(...userData.authorization)
        .send({
          provider_id,
          date: startOfHour(setHours(addDays(new Date(), 1), 17)).toISOString(),
        });

      const newCache = await getCachedAppointments();

      expect(JSON.stringify(oldCache)).not.toBe(JSON.stringify(newCache));
    });
  });
