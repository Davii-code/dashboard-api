import { ChartType } from '../models/chartData';

export interface DashboardRequestDTO {
    tipoGrafico: ChartType;
    dataInicio: string; // ISO (YYYY-MM-DD)
    dataFim: string;    // ISO (YYYY-MM-DD)
}
