import {DashboardService} from "../services/dashboard.service";
import {ChartResponse} from "../../core/models/chartData";
import {DashboardRequestDTO} from "../../core/dtos/dashboardRequestDto";

export class GetChartData {
    private readonly service = new DashboardService();

    async execute(input: DashboardRequestDTO): Promise<ChartResponse> {
        return this.service.getChartData(input.tipoGrafico, input.dataInicio, input.dataFim);
    }
}
