import { Request, Response, NextFunction } from 'express';

export function validateDates(req: Request, res: Response, next: NextFunction) {
    const { dataInicio, dataFim } = req.query;

    if (!dataInicio || !dataFim) {
        return res.status(400).json({
            message: 'Parâmetros "dataInicio" e "dataFim" são obrigatórios.',
        });
    }

    const start = new Date(dataInicio as string);
    const end = new Date(dataFim as string);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({
            message: 'Datas inválidas. Use o formato YYYY-MM-DD.',
        });
    }

    if (start > end) {
        return res.status(400).json({
            message: '"dataInicio" não pode ser maior que "dataFim".',
        });
    }

    next();
}
