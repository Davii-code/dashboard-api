import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { dashboardRouter } from './infra/http/routes/dashboard.routes';
import { swaggerDocument } from './docs/swagger';
import { errorHandler } from './core/errors/errorHandler';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// rotas
app.use('/dashboard', dashboardRouter);

// erro global (sempre por último)
app.use(errorHandler);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📘 Swagger: http://localhost:${PORT}/api-docs`);
});


export { app };
