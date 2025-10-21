import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

const prisma = new PrismaClient();

export async function setupTestDB() {
    console.log('🧱 Configurando banco de teste (SQLite)...');
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });

    // Limpar tabelas
    await prisma.sale.deleteMany();

    // Inserir dados de teste
    await prisma.sale.createMany({
        data: [
            { product: 'Notebook', category: 'Eletrônicos', amount: 1200, saleDate: new Date('2025-01-10') },
            { product: 'Camiseta', category: 'Roupas', amount: 100, saleDate: new Date('2025-01-11') },
            { product: 'Chocolate', category: 'Alimentos', amount: 80, saleDate: new Date('2025-01-12') },
        ],
    });

    console.log('✅ Banco de teste pronto!');
}
