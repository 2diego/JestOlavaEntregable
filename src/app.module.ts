/* eslint-disable prettier/prettier */
// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotebooksModule } from './notebooks/notebooks.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...databaseConfig,
    }),
    NotebooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}