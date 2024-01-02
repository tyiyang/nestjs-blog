/*
 * @Author: tanghao 974958672@qq.com
 * @Date: 2023-12-27 09:41:54
 * @LastEditors: tanghao 974958672@qq.com
 * @LastEditTime: 2023-12-28 09:59:53
 * @FilePath: \real-world\src\app.module.ts
 * @Description:
 *
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { typeOrmConfig } from './config/typeorm.config';
import { TagController } from './tag/tag.controller';
import { TagModule } from './tag/tag.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    UserModule,
    TagModule,
  ],
  controllers: [AppController, TagController],
  providers: [AppService],
})
export class AppModule {}
