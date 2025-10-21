import { Request, Response } from 'express';
import { DashboardService } from '../services/dashboard.service';

const dashboardService = new DashboardService();

export class DashboardController {
    async getDashboardData(req: Request, res: Response) {
        try {
            const { tipoGrafico, dataInicio, dataFim } = req.query;

            if (!tipoGrafico) {
                return res.status(400).json({ message: 'Parâmetro "tipoGrafico" é obrigatório.' });
            }

            const data = await dashboardService.getChartData(
                tipoGrafico as string,
                dataInicio as string,
                dataFim as string
            );

            return res.status(200).json(data);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    }
}
