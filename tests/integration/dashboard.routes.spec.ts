import request from 'supertest';
import express from 'express';
import { dashboardRouter } from '../../src/routes/dashboard.routes';
import { setupTestDB } from '../setupTestDB';

const app = express();
app.use(express.json());
app.use('/dashboard', dashboardRouter);

beforeAll(async () => {
    await setupTestDB();
});

describe('GET /dashboard (integração)', () => {
    it('deve retornar dados reais para gráfico de pizza', async () => {
        const res = await request(app)
            .get('/dashboard')
            .query({
                tipoGrafico: 'pizza',
                dataInicio: '2025-01-01',
                dataFim: '2025-12-31',
            });

        expect(res.status).toBe(200);
        expect(res.body.type).toBe('pie');
        expect(Array.isArray(res.body.labels)).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
    });
});
