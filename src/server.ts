import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dashboardRouter } from './routes/dashboard.routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './docs/swagger';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 📘 Rota do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas principais
app.use('/dashboard', dashboardRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📘 Swagger disponível em http://localhost:${PORT}/api-docs`);
});
