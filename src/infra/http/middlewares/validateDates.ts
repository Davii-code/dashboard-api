import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../../core/errors/appError';
import { isValidISODate } from '../../../core/utils/dateHelpers';

export function validateDates(req: Request, _res: Response, next: NextFunction) {
    const { dataInicio, dataFim } = req.query;
    if (!dataInicio || !dataFim) {
        throw new AppError('Parâmetros "dataInicio" e "dataFim" são obrigatórios.', 400);
    }
    const start = String(dataInicio);
    const end = String(dataFim);
    if (!isValidISODate(start) || !isValidISODate(end)) {
        throw new AppError('Datas inválidas. Use o formato YYYY-MM-DD.', 400);
    }
    if (new Date(start) > new Date(end)) {
        throw new AppError('"data Inicio" não pode ser maior que "data Fim".', 400);
    }
    next();
}
