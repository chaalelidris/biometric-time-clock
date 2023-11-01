// Import necessary modules and setup your app
import request from 'supertest';
import app from '../src/app.js'; // replace with the correct path to your app file

// Assuming you have a test employee ID
const testEmployeeId = '654286c4060a0c7b25d6d5a2';

describe('Check-In API', () => {
    it('should allow an employee to check-in', async () => {
        const response = await request(app)
            .post('/api/v1/attendances/check-in')
            .send({ employeeId: testEmployeeId, comment: 'Arrived at work.' })
            .expect(200);

        expect(response.body).toHaveProperty('message', 'Check-in successful.');
    });


});

describe('Check-Out API', () => {
    it('should allow an employee to check-out', async () => {
        // Assuming you have a test check-in record for the employee
        const testCheckInRecordId = 'your-test-checkin-record-id';

        const response = await request(app)
            .post('/api/v1/attendances/check-out')
            .send({ checkInRecordId: testCheckInRecordId, comment: 'Finished work.' })
            .expect(200);

        expect(response.body).toHaveProperty('message', 'Check-out successful.');
    });


});
