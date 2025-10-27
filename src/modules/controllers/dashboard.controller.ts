import { NextFunction, Request, Response } from 'express';
import { GetChartData } from '../usecases/getChartData';
import { AppError } from '../../core/errors/appError';
import {GetSummaryMetrics} from "../usecases/getSummaryMetrics";

export class DashboardController {
    private readonly getChartDataUC = new GetChartData();
    private readonly getSummaryUC = new GetSummaryMetrics();

    /**
     * GET /dashboard
     * Retorna dados formatados para montar o gráfico (pie/bar/line)
     */
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { tipoGrafico, dataInicio, dataFim } = req.query;

            if (!tipoGrafico) {
                throw new AppError('Parâmetro "tipoGrafico" é obrigatório.', 400);
            }

            const result = await this.getChartDataUC.execute({
                tipoGrafico: String(tipoGrafico) as any,
                dataInicio: String(dataInicio),
                dataFim: String(dataFim),
            });

            return res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }

    /**
     * GET /dashboard/resumo
     * Retorna KPIs: total, média, max, min, etc.
     */
    async getResumo(req: Request, res: Response, next: NextFunction) {
        try {
            const { dataInicio, dataFim } = req.query;

            const result = await this.getSummaryUC.execute({
                dataInicio: String(dataInicio),
                dataFim: String(dataFim),
            });

            return res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }
}