import request from 'supertest';
import app from '../../../../src/main/config/app';

describe('Body Parser Middleware', () => {
    test('Should parser body as json', async () => {
        app.post('/test-body-parser', (req, res) => {
            res.send(req.body);
        });
        await request(app).post('/test-body-parser').send({ name: 'test_name' }).expect({ name: 'test_name' });
    });
});
