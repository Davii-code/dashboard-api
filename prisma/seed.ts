import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const categories = ['Eletrônicos', 'Roupas', 'Alimentos', 'Livros'];
    const products = ['Notebook', 'Camiseta', 'Chocolate', 'Romance'];

    const salesData = Array.from({ length: 40 }).map(() => ({
        product: products[Math.floor(Math.random() * products.length)],
        category: categories[Math.floor(Math.random() * categories.length)],
        amount: Number((Math.random() * 1000 + 100).toFixed(2)),
        saleDate: new Date(
            2025,
            Math.floor(Math.random() * 10), // mês
            Math.floor(Math.random() * 28) + 1 // dia
        ),
    }));

    await prisma.sale.createMany({ data: salesData });

    console.log('✅ Seed executado com sucesso!');
}

main()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
