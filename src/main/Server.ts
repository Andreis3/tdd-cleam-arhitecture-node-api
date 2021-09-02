import 'module-alias/register';
import { MongoHelper } from '@/infra/db/mongodb/helpers/MongoHelpers';
import env from '@/main/config/env';

MongoHelper.connect(env.mongoUrl)
    .then(async () => {
        const app = (await import('./config/App')).default;
        app.listen(env.port, () => console.log(`Sever running at http://localhost:${env.port}`));
    })
    .catch(console.error);
