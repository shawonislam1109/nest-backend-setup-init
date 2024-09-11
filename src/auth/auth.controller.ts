// src/auth/auth.controller.ts
// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, CreateLoginUserDto } from './dto/auth-dto';
import { Auth } from './schema/auth.schema';

// USER TYPES
export type SingUpRes = {
  data: Auth;
  access_token: string;
  message: string;
};

export type LoginTypes = {
  username: string;
  password: string;
};

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() newUser: CreateAuthDto): Promise<SingUpRes> {
    return this.authService.signup(newUser);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginUser: CreateLoginUserDto): Promise<SingUpRes> {
    return this.authService.login(loginUser);
  }
}
