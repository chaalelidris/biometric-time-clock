const request = require('supertest');
const app = require('../server');

describe('Employee API', () => {
    it('should create a new employee', async () => {
        const res = await request(app)
            .post('/employee/create')
            .send({
                lastName: 'Doe',
                firstName: 'John',
                department: 'IT',
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('lastName', 'Doe');
    });

    it('should get a list of employees', async () => {
        const res = await request(app).get('/employee/list');

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
});
