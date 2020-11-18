import { MongoHelper } from '../infra/db/mongodb/helpers/mongoHelpers';
import env from './config/env';

MongoHelper.connect(env.mongoUrl)
    .then(async () => {
        const app = (await import('./config/app')).default;

        app.listen(env.port, () => console.log(`Sever running at http://localhost:${env.port}`));
    })
    .catch(console.error);
