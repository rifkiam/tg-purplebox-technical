import { PrismaClient } from '@prisma/client';

import postsSeeder from './posts.seeder';
import usersSeeder from './users.seeder';

const prisma = new PrismaClient();

async function main() {
    await usersSeeder();
    await postsSeeder();
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
