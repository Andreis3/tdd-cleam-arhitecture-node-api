import express from 'express';
import setupMiddlewares from '@/main/config/Middlewares';
import setupRoutes from '@/main/config/Routes';

const app = express();
setupMiddlewares(app);
setupRoutes(app);

export default app;
