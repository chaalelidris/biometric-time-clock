import request from 'supertest';
import app from '../src/app';

describe('Employee API', () => {
    it('should create a new employee', async () => {
        const res = await request(app)
            .post('/api/v1/employee/create')
            .send({
                lastName: 'Doe',
                firstName: 'John',
                department: 'IT',
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('lastName', 'Doe');
    });

    it('should get a list of employees', async () => {
        const res = await request(app).get('/api/v1/employee/list');

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    // Add more tests as needed for additional functionality
});
