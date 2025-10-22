import request from 'supertest';
import { setupTestDB } from '../setupTestDB';
import {app} from "../../src/server";

beforeAll(async () => {
    await setupTestDB();
});

describe('GET /dashboard (integração)', () => {
    it('deve retornar dados de gráfico de pizza', async () => {
        const res = await request(app)
            .get('/dashboard')
            .query({
                tipoGrafico: 'pie',
                dataInicio: '2025-01-01',
                dataFim: '2025-12-31',
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('type', 'pie');
        expect(Array.isArray(res.body.labels)).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('deve retornar erro 400 quando faltar parâmetros de data', async () => {
        const res = await request(app).get('/dashboard').query({ tipoGrafico: 'pie' });
        expect(res.status).toBe(400);
        expect(res.body.message).toMatch(/dataInicio/i);
    });

    it('deve retornar mensagem para tipo inválido', async () => {
        const res = await request(app)
            .get('/dashboard')
            .query({
                tipoGrafico: 'xyz',
                dataInicio: '2025-01-01',
                dataFim: '2025-12-31',
            });

        expect(res.status).toBe(200);
        expect(res.body.message).toMatch(/inválido/i);
    });
});
