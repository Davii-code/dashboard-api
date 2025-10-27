import {DashboardService} from "../services/dashboard.service";
import {SummaryMetrics} from "../../core/models/summaryMetrics";

export class GetSummaryMetrics {
    private readonly service = new DashboardService();

    async execute(input: { dataInicio: string; dataFim: string }): Promise<SummaryMetrics> {
        return this.service.getSummaryMetrics(input.dataInicio, input.dataFim);
    }
}