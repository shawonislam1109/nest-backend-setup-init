// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CreateAuthDto, CreateLoginUserDto } from './dto/auth-dto';
import { SingUpRes } from './auth.controller';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  // SING UP FOR USER
  async signup(createUser: CreateAuthDto): Promise<SingUpRes> {
    const existingUser = await this.usersService.findByEmail(createUser.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already registered');
    }
    const user = await this.usersService.create({
      ...createUser,
      role: 'ADMIN',
    });
    const validToken = this.createToken(user);
    return {
      data: user,
      access_token: validToken.access_token,
      message: 'User create Successfully',
    };
  }

  // LOGIN FOR USER
  async login(loginUser: CreateLoginUserDto): Promise<SingUpRes> {
    const user = await this.usersService.validateUser(
      loginUser.email,
      loginUser.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const validToken = this.createToken(user);
    return {
      data: user,
      access_token: validToken.access_token,
      message: 'Login Successfully',
    };
  }

  // createToken
  private createToken(user: any) {
    const payload = { username: user.username, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
