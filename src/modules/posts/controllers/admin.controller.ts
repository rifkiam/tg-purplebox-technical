import {
    Controller,
    Get,
    HttpCode,
    Param,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ResponseMessage } from '@/common/decorators/responseMessage.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { Token } from '@/common/decorators/token.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt';
import { RoleGuard } from '@/common/guards/roles/role.guard';

import { PaginationQueryDto } from '../dto/paginationQuery.dto';
import { PostsService } from '../services/posts.service';

@Controller('admin')
@ApiTags('Admin items API')
export class AdminController {
    constructor(private readonly postsService: PostsService) {}

    @Get('/items')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('ADMIN')
    @HttpCode(200)
    @ResponseMessage('Posts successfully fetched')
    async adminFindAllPosts(
        @Query() query: PaginationQueryDto,
        @Token('id') userId: string,
    ) {
        let { page, limit } = query;
        page = page ? page : 1;
        limit = limit ? limit : 5;

        const { res, count } = await this.postsService.findAll(
            page,
            limit,
            userId,
        );

        const parsedResponse = {
            items: res,
            total: count,
            page,
            limit,
            total_pages: Math.ceil(count / limit),
        };

        return parsedResponse;
    }

    @Get('/item/:id')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('ADMIN')
    @HttpCode(201)
    @ResponseMessage('Post successfully fetched')
    async adminFindPostById(
        @Param('id') id: string,
        @Token('id') userId: string,
    ) {
        const post = await this.postsService.findOne(id, userId);

        return post;
    }
}
