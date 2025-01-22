import { ApiProperty } from '@nestjs/swagger';
import { PostVisibility } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class PostDto {
    @ApiProperty({
        description: 'Post title',
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        description: 'Post text content',
    })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({
        description: 'Post visibility status (PUBLIC/PRIVATE)',
    })
    @IsEnum(PostVisibility)
    @IsNotEmpty()
    visibility: PostVisibility;
}
