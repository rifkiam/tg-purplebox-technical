import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @ApiProperty({
        example: 'new user',
    })
    @IsString()
    username: string;

    @ApiProperty({
        example: 'password',
    })
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;

    @ApiProperty({
        example: 'Use new',
    })
    @IsString()
    name: string;

    @ApiProperty({
        example: 'newuser@gmail.com',
    })
    @IsEmail({}, { message: 'Please provide a valid email address format' })
    email: string;
}
