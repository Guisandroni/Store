import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Iniciando seed do banco de dados...');

    // Limpar dados existentes (opcional)
    await prisma.produto.deleteMany();
    console.log('🗑️  Dados antigos removidos');

    // Produtos de exemplo
    const produtos = [
        {
            name: 'Notebook Dell Inspiron',
            price: 3499.99,
            image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400'
        },
        {
            name: 'Mouse Logitech MX Master 3',
            price: 449.90,
            image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400'
        },
        {
            name: 'Teclado Mecânico RGB',
            price: 599.00,
            image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400'
        },
        {
            name: 'Monitor LG UltraWide 29"',
            price: 1299.90,
            image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400'
        },
        {
            name: 'Headset Gamer HyperX',
            price: 389.99,
            image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400'
        },
        {
            name: 'Webcam Logitech C920',
            price: 499.00,
            image: 'https://images.unsplash.com/photo-1588868771097-f8a8c8e28d37?w=400'
        },
        {
            name: 'SSD Samsung 1TB',
            price: 699.90,
            image: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400'
        },
        {
            name: 'Cadeira Gamer DXRacer',
            price: 1899.00,
            image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400'
        },
        {
            name: 'Smartphone Samsung Galaxy S23',
            price: 4199.00,
            image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400'
        },
        {
            name: 'Tablet iPad Air',
            price: 5499.00,
            image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400'
        },
        {
            name: 'Câmera Sony Alpha',
            price: 8999.00,
            image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400'
        },
        {
            name: 'Smartwatch Apple Watch',
            price: 3299.00,
            image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400'
        }
    ];

    // Criar produtos
    for (const produto of produtos) {
        await prisma.produto.create({
            data: produto
        });
        console.log(`✅ Criado: ${produto.name}`);
    }

    console.log('🎉 Seed concluído com sucesso!');
    console.log(`📦 Total de produtos criados: ${produtos.length}`);
}

main()
    .catch((e) => {
        console.error('❌ Erro ao executar seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

