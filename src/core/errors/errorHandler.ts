import { NextFunction, Request, Response } from 'express';
import { AppError } from './appError';
import { logger } from '../utils/logger';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof AppError) {
        logger.warn({ msg: err.message, details: err.details, status: err.statusCode });
        return res.status(err.statusCode).json({ message: err.message, details: err.details });
    }
    logger.error({ msg: err.message, stack: err.stack });
    return res.status(500).json({ message: 'Erro interno do servidor' });
}
