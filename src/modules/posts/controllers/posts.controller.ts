import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';

import { ResponseMessage } from '@/common/decorators/responseMessage.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { Token } from '@/common/decorators/token.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt';
import { RoleGuard } from '@/common/guards/roles/role.guard';
import { sendSuccess } from '@/common/response/ApiResponse';

import { PaginationQueryDto } from '../dto/paginationQuery.dto';
import { PostDto } from '../dto/post.dto';
import { PostsService } from '../services/posts.service';

@Controller('items')
@ApiTags('Items')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('USER')
    @HttpCode(201)
    @ResponseMessage('Post successfully created')
    @ApiOkResponse({
        schema: {
            example: sendSuccess('Post successfully created', 201, {
                id: 'post_id',
                title: "New user's content title",
                content: "New user's content",
                visibility: 'PUBLIC',
                user_id: 'users_id',
                created_at: '2025-01-23T03:25:50.511Z',
                updated_at: '2025-01-23T03:25:50.511Z',
            }),
        },
    })
    async create(@Body() createPostDto: PostDto, @Token('id') userId: string) {
        const res = await this.postsService.create(userId, createPostDto);

        return res;
    }

    @Get()
    @HttpCode(200)
    @ResponseMessage('Posts successfully fetched')
    @ApiOkResponse({
        schema: {
            example: sendSuccess('Posts successfully fetched', 200, [
                {
                    id: 'post_id',
                    title: "New user's content title",
                    content: "New user's content",
                    visibility: 'PUBLIC',
                    user_id: 'users_id',
                    created_at: '2025-01-23T03:25:50.511Z',
                    updated_at: '2025-01-23T03:25:50.511Z',
                },
            ]),
        },
    })
    async findAll(@Query() query: PaginationQueryDto) {
        let { page, limit } = query;
        page = page ? page : 1;
        limit = limit ? limit : 5;

        const { res, count } = await this.postsService.findAll(page, limit);

        const parsedResponse = {
            data: res,
            total: count,
            page,
            limit,
            total_pages: Math.ceil(count / limit),
        };

        return parsedResponse;
    }

    @Get('/personal')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('USER')
    @HttpCode(200)
    @ResponseMessage('Posts successfully fetched')
    @ApiOkResponse({
        schema: {
            example: sendSuccess('Posts successfully fetched', 200, [
                {
                    id: 'post_id',
                    title: "New user's content title",
                    content: "New user's content",
                    visibility: 'PRIVATE',
                    user_id: 'users_id',
                    created_at: '2025-01-23T03:25:50.511Z',
                    updated_at: '2025-01-23T03:25:50.511Z',
                },
            ]),
        },
    })
    async dashboardFindAll(
        @Query() query: PaginationQueryDto,
        @Token('id') userId: string,
    ) {
        let { page, limit } = query;
        page = page ? page : 1;
        limit = limit ? limit : 5;

        const { res, count } = await this.postsService.dashboardFindAll(
            page,
            limit,
            userId,
        );

        const parsedResponse = {
            data: res,
            total: count,
            page,
            limit,
            total_pages: Math.ceil(count / limit),
        };

        return parsedResponse;
    }

    @Get(':id')
    @ApiBearerAuth()
    @HttpCode(200)
    @ResponseMessage('Post successfully fetched')
    @ApiOkResponse({
        schema: {
            example: sendSuccess('Post successfully fetched', 200, {
                id: 'post_id',
                title: "New user's content title",
                content: "New user's content",
                visibility: 'PUBLIC',
                user_id: 'users_id',
                created_at: '2025-01-23T03:25:50.511Z',
                updated_at: '2025-01-23T03:25:50.511Z',
            }),
        },
    })
    async findOne(@Param('id') id: string, @Token('id') userId: string) {
        userId = userId != null ? userId : '';

        return await this.postsService.findOne(id, userId);
    }

    @Put(':id')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('USER')
    @HttpCode(201)
    @ResponseMessage('Post successfully updated')
    @ApiCreatedResponse({
        schema: {
            example: sendSuccess('Post successfully updated', 201, {
                id: 'post_id',
                title: "New user's content title",
                content: "New user's content",
                visibility: 'PUBLIC',
                user_id: 'users_id',
                created_at: '2025-01-23T03:25:50.511Z',
                updated_at: '2025-01-23T03:25:50.511Z',
            }),
        },
    })
    async update(
        @Param('id') id: string,
        @Body() updatePostDto: PostDto,
        @Token('id') userId: string,
    ) {
        return await this.postsService.update(id, userId, updatePostDto);
    }

    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('ADMIN', 'USER')
    @HttpCode(200)
    @ResponseMessage('Post successfully deleted')
    @ApiOkResponse({
        schema: { example: sendSuccess('Post successfully deleted', 200, {}) },
    })
    async remove(@Param('id') id: string, @Token('id') userId: string) {
        return await this.postsService.remove(id, userId);
    }
}
