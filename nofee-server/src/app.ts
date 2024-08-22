import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import * as middlewares from './middlewares';
import api from './api';
require('dotenv').config();
const app = express();
app.use(morgan('dev'));
app.use(helmet());
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(middlewares.isAuthenticated);
app.use('/api/v1', api);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
export default app;
