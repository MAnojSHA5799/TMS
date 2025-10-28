// src/app.module.ts
import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { TenantsModule } from './tenants/tenants.module';
import { UsersModule } from './users/users.module';
import { RoutesModule } from './routes/routes.module';
import { BusesModule } from './buses/buses.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT! || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'tms_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Only for development — disable in production
    }),
    AuthModule,
    TenantsModule,
    UsersModule,
    RoutesModule,
    BusesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    try {
      if (this.dataSource.isInitialized) {
        console.log('✅ Database connected successfully');
      } else {
        await this.dataSource.initialize();
        console.log('✅ Database connected successfully');
      }
    } catch (error) {
      console.error('❌ Database connection failed:', error.message);
    }
  }
}
