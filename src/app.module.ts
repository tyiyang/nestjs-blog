/*
 * @Author: tanghao 974958672@qq.com
 * @Date: 2023-12-27 09:41:54
 * @LastEditors: tanghao 974958672@qq.com
 * @LastEditTime: 2023-12-27 10:02:19
 * @FilePath: \real-world\src\app.module.ts
 * @Description:
 *
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
