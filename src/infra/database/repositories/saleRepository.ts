import { prisma } from '../prismaClient';
import { Sale } from '../../../core/models/sale';

export class SaleRepository {
    async findByDateRange(start: Date, end: Date): Promise<Sale[]> {
        return prisma.sale.findMany({
            where: { saleDate: { gte: start, lte: end } },
        }) as unknown as Sale[];
    }
}
