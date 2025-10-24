import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import { dashboardRouter } from './routes/dashboard.routes';
import { swaggerDocument } from '../../docs/swagger';
import { errorHandler } from '../../core/errors/errorHandler';


dotenv.config();

export const app = express();

app.use(cors());
app.use(express.json());

// documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// rotas
app.use('/dashboard', dashboardRouter);

// middleware global de erro
app.use(errorHandler);