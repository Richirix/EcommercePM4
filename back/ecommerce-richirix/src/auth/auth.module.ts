import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from './auth.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository],
})
export class AuthModule {}
