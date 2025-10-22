import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { execSync } from 'child_process';

dotenv.config({ path: '.env.test' });

const prisma = new PrismaClient();

export async function setupTestDB() {
    console.log('🧩 Preparando banco de teste (SQLite)...');

    try {
        execSync('npx prisma migrate deploy', { stdio: 'ignore' });
    } catch (err) {
        console.warn('⚠️  Migrations não aplicadas, tentando gerar client...');
        execSync('npx prisma generate', { stdio: 'ignore' });
    }

    await prisma.sale.deleteMany();
    await prisma.sale.createMany({
        data: [
            { product: 'Notebook', category: 'Eletrônicos', amount: 1200, saleDate: new Date('2025-01-10') },
            { product: 'Camiseta', category: 'Roupas', amount: 100, saleDate: new Date('2025-02-05') },
            { product: 'Chocolate', category: 'Alimentos', amount: 80, saleDate: new Date('2025-03-12') },
        ],
    });

    console.log('✅ Banco de teste pronto!');
}
