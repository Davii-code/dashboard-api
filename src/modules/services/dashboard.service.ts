import {ChartData, ChartResponse, ChartType} from "../../core/models/chartData";
import {SaleRepository} from "../../infra/database/repositories/saleRepository";
import {toEndOfDay, toStartOfDay} from "../../core/utils/dateHelpers";
import {Sale} from "@prisma/client";

export class DashboardService {
    constructor(private readonly saleRepo: SaleRepository = new SaleRepository()) {}

    async getChartData(tipoGrafico: string, dataInicio: string, dataFim: string): Promise<ChartResponse> {
        const type = this.normalizeType(tipoGrafico);
        if (!type) return { message: 'Tipo de gráfico inválido. Use: pie, line ou bar.' };

        const start = toStartOfDay(dataInicio);
        const end = toEndOfDay(dataFim);

        const sales = await this.saleRepo.findByDateRange(start, end);
        if (!sales.length) return { message: 'Nenhum dado encontrado para o período informado.' };

        switch (type) {
            case 'pie':  return this.formatPie(sales);
            case 'bar':  return this.formatBar(sales);
            case 'line': return this.formatLine(sales);
        }
    }

    private normalizeType(t: string): ChartType | null {
        const m = t.toLowerCase();
        if (m === 'pizza') return 'pie';
        if (m === 'linha') return 'line';
        if (m === 'barra') return 'bar';
        if (m === 'pie' || m === 'line' || m === 'bar') return m as ChartType;
        return null;
    }

    private formatPie(sales: Sale[]): ChartData {
        const grouped = sales.reduce<Record<string, number>>((acc, s) => {
            acc[s.category] = (acc[s.category] || 0) + s.amount;
            return acc;
        }, {});
        return { type: 'pie', labels: Object.keys(grouped), data: Object.values(grouped) };
    }

    private formatBar(sales: Sale[]): ChartData {
        const grouped = sales.reduce<Record<string, number>>((acc, s) => {
            acc[s.product] = (acc[s.product] || 0) + s.amount;
            return acc;
        }, {});
        return { type: 'bar', labels: Object.keys(grouped), data: Object.values(grouped) };
    }

    private formatLine(sales: Sale[]): ChartData {
        const grouped = sales.reduce<Record<string, number>>((acc, s) => {
            const day = s.saleDate.toISOString().split('T')[0];
            acc[day] = (acc[day] || 0) + s.amount;
            return acc;
        }, {});
        const labels = Object.keys(grouped).sort();
        const data = labels.map((k) => grouped[k]);
        return { type: 'line', labels, data };
    }
}
