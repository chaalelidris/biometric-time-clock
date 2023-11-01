import request from 'supertest';
import app from '../src/app.js'; // Assuming your Express app instance is exported from 'src/app.js'
import Employee from '../src/models/employee-model.js';

beforeEach(async () => {
    await Employee.deleteMany({});
});

describe('Employee Management API', () => {
    describe('Create Employee API', () => {
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
    });

    describe('Get Employees API', () => {
        it('should get a list of all employees', async () => {
            // Insert some dummy employees into the database
            await Employee.create([
                { lastName: 'Doe', firstName: 'John', dateCreated: new Date(), department: 'IT' },
                { lastName: 'Smith', firstName: 'Jane', dateCreated: new Date(), department: 'HR' },
            ]);

            const response = await request(app)
                .get('/api/v1/employees')
                .expect(200);

            expect(response.body).toHaveLength(2);
        });

        it('should get employees based on the provided creationDate filter', async () => {
            // Insert an employee with a specific creation date
            const createdEmployee = await Employee.create({
                lastName: 'Doe',
                firstName: 'John',
                dateCreated: new Date('2023-11-01T08:19:19.903Z'),
                department: 'IT',
            });

            const response = await request(app)
                .get('/api/v1/employees')
                .query({ creationDate: '2023-11-01' })
                .expect(200);

            expect(response.body).toHaveLength(1);
            expect(response.body[0]._id).toEqual(createdEmployee._id.toString());
        });
    });


});
