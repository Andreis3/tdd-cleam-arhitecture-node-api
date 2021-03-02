import { Express } from 'express';
import { bodyParser, contentType, cors } from '../middlewares/Index';

export default (app: Express): void => {
    app.use(bodyParser);
    app.use(cors);
    app.use(contentType);
};
