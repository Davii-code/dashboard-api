import { ChartType } from '../models/chartData';

export interface DashboardRequestDTO {
    tipoGrafico: ChartType;
    dataInicio: string;
    dataFim: string;
}
