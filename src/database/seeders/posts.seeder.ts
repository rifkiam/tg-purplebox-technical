import { PostVisibility, Prisma, PrismaClient } from '@prisma/client';

import postData from './data/posts.json';

const prisma = new PrismaClient();

export default async function postsSeeder() {
    for (const idx in postData) {
        const post = postData[idx];
        const posts: Prisma.PostsUncheckedCreateInput = {
            title: post.title,
            content: post.content,
            user_id: post.user_id,
            visibility:
                post.visibility === 'PUBLIC'
                    ? PostVisibility.PUBLIC
                    : PostVisibility.PRIVATE,
        };

        await prisma.posts.create({
            data: posts,
        });
    }
    console.log('Posts seeded successfully');
}
