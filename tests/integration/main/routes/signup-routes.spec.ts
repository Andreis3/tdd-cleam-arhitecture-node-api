import request from 'supertest';
import app from '../../../../src/main/config/app';

describe('Signup Routes', () => {
    test('Should return an account on success', async () => {
        await request(app)
            .post('/api/signup')
            .send({
                name: 'Test_name',
                email: 'test_email@email.com',
                password: '123456',
                passwordConfirmation: '123456',
            })
            .expect(200);
    });
});
