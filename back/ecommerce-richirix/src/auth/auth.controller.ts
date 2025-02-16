/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  InternalServerErrorException,
  UseInterceptors,
  
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, UsersLogingDto } from 'src/users/users.dto';
import { ExcludePasswordInterceptor } from 'src/interceptors/exclude-password.interceptor';

@Controller('auth')
@UseInterceptors(ExcludePasswordInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('/signup')
  signup(@Body() user: CreateUserDto) {
    const { confirmPassword, ...newUser } = user;
    return this.authService.signup(newUser)
  }

  @Post('/signin')
  signIn(@Body() credentials: UsersLogingDto) {
    const { email, password } = credentials;
    try {
      return this.authService.signIn(email, password);
    } catch (error) {
      throw new InternalServerErrorException('Error al iniciar sesión');
    }
  }
}
