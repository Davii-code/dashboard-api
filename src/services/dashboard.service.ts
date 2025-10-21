import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DashboardService {
    async getChartData(tipoGrafico: string, dataInicio: string, dataFim: string) {
        const startDate = new Date(dataInicio);
        const endDate = new Date(dataFim);

        const sales = await prisma.sale.findMany({
            where: {
                saleDate: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });

        if (!sales.length) {
            return { message: 'Nenhum dado encontrado para o período informado.' };
        }

        switch (tipoGrafico) {
            case 'pizza':
                return this.formatPieChart(sales);
            case 'linha':
                return this.formatLineChart(sales);
            case 'barra':
                return this.formatBarChart(sales);
            default:
                return { message: 'Tipo de gráfico inválido. Use: pizza, linha ou barra.' };
        }
    }

    private formatPieChart(sales: any[]) {
        // Soma o total por categoria
        const grouped = sales.reduce((acc, s) => {
            acc[s.category] = (acc[s.category] || 0) + s.amount;
            return acc;
        }, {} as Record<string, number>);

        return {
            type: 'pie',
            labels: Object.keys(grouped),
            data: Object.values(grouped),
        };
    }

    private formatLineChart(sales: any[]) {
        // Agrupa por data
        const grouped = sales.reduce((acc, s) => {
            const day = s.saleDate.toISOString().split('T')[0];
            acc[day] = (acc[day] || 0) + s.amount;
            return acc;
        }, {} as Record<string, number>);

        return {
            type: 'line',
            labels: Object.keys(grouped).sort(),
            data: Object.keys(grouped)
                .sort()
                .map((key) => grouped[key]),
        };
    }

    private formatBarChart(sales: any[]) {
        // Soma o total por produto
        const grouped = sales.reduce((acc, s) => {
            acc[s.product] = (acc[s.product] || 0) + s.amount;
            return acc;
        }, {} as Record<string, number>);

        return {
            type: 'bar',
            labels: Object.keys(grouped),
            data: Object.values(grouped),
        };
    }
}
