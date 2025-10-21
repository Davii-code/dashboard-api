import { DashboardService } from '../../src/services/dashboard.service';
import { PrismaClient } from '@prisma/client';

jest.mock('@prisma/client', () => {
    const mPrismaClient = {
        sale: {
            findMany: jest.fn(),
        },
    };
    return { PrismaClient: jest.fn(() => mPrismaClient) };
});

describe('DashboardService', () => {
    let dashboardService: DashboardService;
    let prismaMock: { sale: { findMany: jest.Mock } };

    beforeEach(() => {
        dashboardService = new DashboardService();
        prismaMock = new PrismaClient() as any;
    });

    it('deve retornar dados formatados para gráfico de pizza', async () => {
        prismaMock.sale.findMany.mockResolvedValue([
            { category: 'Eletrônicos', amount: 100, saleDate: new Date() },
            { category: 'Roupas', amount: 50, saleDate: new Date() },
            { category: 'Eletrônicos', amount: 150, saleDate: new Date() },
        ]);

        const result = await dashboardService.getChartData(
            'pizza',
            '2025-01-01',
            '2025-12-31'
        );

        if ('type' in result) {
            expect(result.type).toBe('pie');
            expect(result.labels).toContain('Eletrônicos');
            expect(result.data[0]).toBeGreaterThan(0);
        } else {
            fail(`Esperava dados de gráfico, mas veio mensagem: ${result.message}`);
        }
    });

    it('deve retornar mensagem para tipo de gráfico inválido', async () => {
        prismaMock.sale.findMany.mockResolvedValue([]);
        const result = await dashboardService.getChartData('xyz', '2025-01-01', '2025-12-31');
        if ('message' in result) {
            expect(result.message).toContain('Tipo de gráfico inválido');
        }
    });
});
