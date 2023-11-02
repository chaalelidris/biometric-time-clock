import request from 'supertest';
import app from '../src/app';

describe('Employee API', () => {
    it('should create a new employee', async () => {
        const response = await request(app)
            .post('/api/v1/employees/create')
            .send({
                lastName: 'Doe',
                firstName: 'John',
                department: 'IT',
            })
            .expect(201);

        expect(response.body).toHaveProperty('_id');
        expect(response.body.lastName).toBe('Doe');
        expect(response.body.firstName).toBe('John');
        expect(response.body.dateCreated).toBeDefined();
        expect(response.body.department).toBe('IT');
    });

    it('should get a list of all employees', async () => {
        const response = await request(app)
            .get('/api/v1/employees')
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should filter employees by creation date', async () => {
        const response = await request(app)
            .get('/api/v1/employees?creationDate=2023-11-01')
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should allow an employee to check-in and then check-out', async () => {
        // Create an employee first 
        const createEmployeeResponse = await request(app)
            .post('/api/v1/employees/create')
            .send({
                lastName: 'Doe',
                firstName: 'John',
                department: 'IT',
            })
            .expect(201);

        const employeeId = createEmployeeResponse.body._id;

        // Perform check-in
        const checkInResponse = await request(app)
            .post('/api/v1/attendances/check-in')
            .send({
                employeeId,
                comment: 'Arrived at work.',
            })
            .expect(200);


        // Perform check-out
        const checkOutResponse = await request(app)
            .post('/api/v1/attendances/check-out')
            .send({
                employeeId,
                comment: 'Finished work.',
            })
            .expect(200);

    });
});
