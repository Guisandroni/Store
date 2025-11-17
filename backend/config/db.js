import { PrismaClient } from '@prisma/client';



const prisma = new PrismaClient();

export const conectDB = async () => {
    try {
        await prisma.$connect();
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default prisma;