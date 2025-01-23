import {
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ResponseMessage } from '@/common/decorators/responseMessage.decorator';
import { Token } from '@/common/decorators/token.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt';
import { sendException, sendSuccess } from '@/common/response/ApiResponse';

import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@Controller('')
@ApiTags('Authentication')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('auth/login')
    @HttpCode(200)
    @ResponseMessage('Login success')
    @ApiBadRequestResponse({
        schema: {
            example: sendException('Bad Request Exception', 400, {
                error: [
                    {
                        value: 'testgmail.com',
                        property: 'email',
                        children: [],
                        constraints: {
                            isEmail: 'email must be an email',
                        },
                    },
                ],
            }),
        },
    })
    @ApiOkResponse({
        schema: {
            example: sendSuccess('Login success', 200, {
                access_token: '4cce5s.t0k3N',
            }),
        },
    })
    async login(@Body() loginDto: LoginDto) {
        const login = await this.authService.login(loginDto);
        return login;
    }

    @Post('auth/register')
    @HttpCode(201)
    @ResponseMessage('Successfully created new user')
    @ApiBadRequestResponse({
        schema: {
            example: sendException('Bad Request Exception', 400, {
                error: [
                    {
                        value: 'testgmail.com',
                        property: 'email',
                        children: [],
                        constraints: {
                            isEmail: 'email must be an email',
                        },
                    },
                ],
            }),
        },
    })
    @ApiCreatedResponse({
        schema: {
            example: sendSuccess('Successfully created new user', 201, {
                access_token: '4cce5s.t0k3N',
            }),
        },
    })
    async register(@Body() registerDto: RegisterDto) {
        const register = await this.authService.register(registerDto);
        return register;
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @HttpCode(200)
    @ResponseMessage('Token valid')
    @ApiUnauthorizedResponse({
        schema: { example: sendException('Unauthorized', 401) },
    })
    @ApiOkResponse({
        schema: {
            example: sendSuccess('Token valid', 200, {
                username: 'testinguser',
                id: '6861f0c4-cdfa-4af0-9c7a-128a7ef80ae5',
                role: 'USER',
            }),
        },
    })
    async validateToken(@Token('id') id: string) {
        const user = await this.authService.getUser(id);
        return user;
    }
}
