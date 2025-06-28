const request = require('supertest');
const app = require('../app');
const Bus = require('../models/Bus');

describe('Bus API', () => {
  beforeEach(async () => {
    await Bus.deleteMany({});
  });

  test('POST /api/buses/add - Create new bus', async () => {
    const res = await request(app)
      .post('/api/buses/add')
      .send({ busNumber: 'BUS-1000' });
    expect(res.statusCode).toEqual(201);
    expect(res.body.busNumber).toBe('BUS-1000');
  });
});