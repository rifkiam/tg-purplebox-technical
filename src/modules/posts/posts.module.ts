import { Module } from '@nestjs/common';

import { PrismaService } from '@/providers/prisma';

import { AdminController } from './controllers/admin.controller';
import { PostsController } from './controllers/posts.controller';
import { PostsService } from './services/posts.service';

@Module({
    controllers: [PostsController, AdminController],
    providers: [PostsService, PrismaService],
})
export class PostsModule {}
