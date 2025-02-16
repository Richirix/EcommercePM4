import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
  Query,
  ParseUUIDPipe,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from '../entities/users.entity';
import { ExcludePasswordInterceptor } from 'src/interceptors/exclude-password.interceptor';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
@UseInterceptors(ExcludePasswordInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async getUsers(@Query('page') page: number, @Query('limit') limit: number) {
    try {
      const currentPage = page || 1;
      const currentLimit = limit || 5;
      return await this.usersService.getUsers(currentPage, currentLimit);
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener usuarios');
    }
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  async getUserById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const user = await this.usersService.getUserById(id);
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener el usuario');
    }
  }

  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(AuthGuard)
  async updateUserById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: User,
  ) {
    try {
      const updatedUser = await this.usersService.updateUserById(id, user);
      if (!updatedUser) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar el usuario');
    }
  }

  // @Post()
  // async createUser(@Body() user: CreateUserDto) {
  //   try {
  //     return await this.usersService.createUser(user);
  //   } catch (error) {
  //     throw new InternalServerErrorException('Error al crear el usuario');
  //   }
  // }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteUserById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const result = await this.usersService.deleteUserById(id);
      if (!result) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return { message: 'Usuario eliminado correctamente' };
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar el usuario');
    }
  }
}
