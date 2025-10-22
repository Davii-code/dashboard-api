import {DashboardService} from "../../src/modules/services/dashboard.service";
import {Sale} from "@prisma/client";

describe('DashboardService', () => {
    let service: DashboardService;
    let repoMock: { findByDateRange: jest.Mock };

    beforeEach(() => {
        repoMock = { findByDateRange: jest.fn() };
        service = new DashboardService(repoMock as any);
    });

    it('deve retornar dados formatados para gráfico de pizza', async () => {
        const fakeSales: Sale[] = [
            { id: 1, product: 'Notebook', category: 'Eletrônicos', amount: 1200, saleDate: new Date(), createdAt: new Date() },
            { id: 2, product: 'Camiseta', category: 'Roupas', amount: 200, saleDate: new Date(), createdAt: new Date() },
            { id: 3, product: 'Notebook', category: 'Eletrônicos', amount: 300, saleDate: new Date(), createdAt: new Date() },
        ];

        repoMock.findByDateRange.mockResolvedValue(fakeSales);

        const result = await service.getChartData('pie', '2025-01-01', '2025-12-31');

        if ('type' in result) {
            expect(result.type).toBe('pie');
            expect(result.labels).toContain('Eletrônicos');
            expect(result.labels).toContain('Roupas');
            expect(result.data.length).toBe(2);
        } else {
            fail('Esperava dados de gráfico, mas veio mensagem.');
        }
    });

    it('deve retornar mensagem para tipo de gráfico inválido', async () => {
        repoMock.findByDateRange.mockResolvedValue([]);
        const result = await service.getChartData('xyz', '2025-01-01', '2025-12-31');
        expect(result).toHaveProperty('message');
        if ('message' in result)
         expect(result.message).toMatch(/inválido/i);
    });

    it('deve retornar mensagem quando não há dados', async () => {
        repoMock.findByDateRange.mockResolvedValue([]);
        const result = await service.getChartData('pie', '2025-01-01', '2025-12-31');
        expect(result).toHaveProperty('message');
        if ('message' in result)
            expect(result.message).toMatch(/Nenhum dado/);
    });
});
