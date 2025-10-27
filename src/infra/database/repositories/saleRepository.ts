import { prisma } from '../prismaClient';
import { Sale } from '../../../core/models/sale';

export class SaleRepository {
    async findByDateRange(start: Date, end: Date): Promise<Sale[]> {
        return prisma.sale.findMany({
            where: { saleDate: { gte: start, lte: end } },
        }) as unknown as Sale[];
    }
    async getAggregatesByDateRange(start: Date, end: Date) {
        const whereFilter = { saleDate: { gte: start, lte: end } };

        // agregações básicas
        const aggregate = await prisma.sale.aggregate({
            where: whereFilter,
            _sum: { amount: true },
            _avg: { amount: true },
            _min: { amount: true },
            _max: { amount: true },
            _count: { _all: true }
        });

        // produto que mais faturou no período
        const topProductGroup = await prisma.sale.groupBy({
            by: ['product'],
            where: whereFilter,
            _sum: { amount: true },
            orderBy: {
                _sum: { amount: 'desc' }
            },
            take: 1
        });

        // categoria que mais faturou no período
        const topCategoryGroup = await prisma.sale.groupBy({
            by: ['category'],
            where: whereFilter,
            _sum: { amount: true },
            orderBy: {
                _sum: { amount: 'desc' }
            },
            take: 1
        });

        const topProduct = topProductGroup.length
            ? {
                nome: topProductGroup[0].product,
                valor: topProductGroup[0]._sum.amount ?? 0
            }
            : null;

        const topCategory = topCategoryGroup.length
            ? {
                nome: topCategoryGroup[0].category,
                valor: topCategoryGroup[0]._sum.amount ?? 0
            }
            : null;

        return {
            aggregate,
            topProduct,
            topCategory
        };
    }
}