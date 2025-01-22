import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationQueryDto {
    @ApiPropertyOptional({
        description: 'page',
    })
    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @IsOptional()
    @Min(1)
    page: number;

    @ApiPropertyOptional({
        description: 'Item count to be fetched',
    })
    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @IsOptional()
    @Min(1)
    limit: number;
}
