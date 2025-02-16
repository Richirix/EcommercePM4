import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';
import { FileUploapModule } from './file-upload/file-uploap.module';
import typeorm from 'src/config/typeorm';
import { JwtModule } from '@nestjs/jwt';



@Module({
  imports: [
    ProductsModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm'),

    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions:{
        expiresIn: '1h',
      }
    }),
    OrdersModule,
    FileUploapModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
