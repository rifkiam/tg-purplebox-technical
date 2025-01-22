import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/providers/prisma';

import { PostDto } from '../dto/post.dto';

@Injectable()
export class PostsService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(userId: string, postDto: PostDto) {
        const { title, content, visibility } = postDto;

        const res = await this.prismaService.posts.create({
            data: {
                title,
                content,
                visibility,
                user_id: userId,
            },
        });

        return res;
    }

    async findAll(page: number, limit: number, userId?: string) {
        const userRole = userId
            ? await this.prismaService.users.findFirst({
                  where: {
                      id: userId,
                  },
                  select: {
                      user_type: true,
                  },
              })
            : { user_type: 'USER' };

        if (!userRole) {
            throw new NotFoundException('User not found!');
        }

        const res = await this.prismaService.posts.findMany({
            take: limit,
            skip: page == 1 ? 0 : (page - 1) * limit,
            orderBy: {
                created_at: 'asc',
            },
            where:
                userRole.user_type == 'ADMIN' ? {} : { visibility: 'PUBLIC' },
        });

        const count = await this.prismaService.posts.count({
            where:
                userRole.user_type == 'ADMIN' ? {} : { visibility: 'PUBLIC' },
        });

        return { res, count };
    }

    async dashboardFindAll(page: number, limit: number, userId: string) {
        const res = await this.prismaService.posts.findMany({
            take: limit,
            skip: page == 1 ? 0 : (page - 1) * limit,
            orderBy: {
                created_at: 'asc',
            },
            where: {
                user_id: userId,
            },
        });

        const count = await this.prismaService.posts.count({
            where: {
                user_id: userId,
            },
        });

        return { res, count };
    }

    async findOne(id: string, userId?: string) {
        const userRole = userId
            ? await this.prismaService.users.findFirst({
                  where: {
                      id: userId,
                  },
                  select: {
                      user_type: true,
                  },
              })
            : { user_type: 'USER' };

        if (!userRole) {
            throw new NotFoundException('User not found!');
        }

        const post = await this.prismaService.posts.findFirst({
            where: { id },
        });

        if (!post) {
            throw new NotFoundException('Post not found!');
        }

        if (
            post.visibility === 'PRIVATE' &&
            post.user_id !== userId &&
            userRole.user_type !== 'ADMIN'
        ) {
            throw new NotFoundException('Post not found!');
        }

        return post;
    }

    async update(id: string, userId: string, postDto: PostDto) {
        const existingPost = await this.prismaService.posts.findFirst({
            where: {
                id,
                user_id: userId,
            },
        });

        if (!existingPost) {
            throw new NotFoundException('Post not found!');
        }

        const update = await this.prismaService.posts.update({
            where: {
                id,
                user_id: userId,
            },
            data: {
                title: postDto.title,
                content: postDto.content,
                visibility: postDto.visibility,
            },
        });

        return update;
    }

    async remove(id: string, userId: string) {
        const userRole = await this.prismaService.users.findFirst({
            where: { id: userId },
            select: { user_type: true },
        });

        const existingPost = await this.prismaService.posts.findFirst({
            where:
                userRole.user_type === 'ADMIN'
                    ? { id }
                    : { id, user_id: userId },
        });

        if (!existingPost) {
            throw new NotFoundException('Post not found!');
        }

        await this.prismaService.posts.delete({
            where:
                userRole.user_type === 'ADMIN'
                    ? { id }
                    : { id, user_id: userId },
        });

        return {};
    }
}
