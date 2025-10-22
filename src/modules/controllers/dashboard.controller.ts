import { NextFunction, Request, Response } from 'express';
import { GetChartData } from '../usecases/getChartData';
import { AppError } from '../../core/errors/appError';

export class DashboardController {
    private readonly getChartDataUC = new GetChartData();

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
}
