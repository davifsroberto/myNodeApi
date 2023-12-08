import env from './config/env';
import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper';

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default;

    app.listen(env.port, () =>
      console.info(`Server runing at http://localhost:${env.port}`),
    );
  })
  .catch(console.error);
