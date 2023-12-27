/*
 * @Author: tanghao 974958672@qq.com
 * @Date: 2023-12-27 09:41:54
 * @LastEditors: tanghao 974958672@qq.com
 * @LastEditTime: 2023-12-27 11:01:42
 * @FilePath: \real-world\src\app.module.ts
 * @Description:
 *
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ormConfig from '../ormconfig';
@Module({
  imports: [TypeOrmModule.forRoot(ormConfig as TypeOrmModuleOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
