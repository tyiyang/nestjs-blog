/*
 * @Author: tanghao 974958672@qq.com
 * @Date: 2023-12-27 09:41:54
 * @LastEditors: tanghao 974958672@qq.com
 * @LastEditTime: 2024-01-02 15:43:44
 * @FilePath: \real-world\src\main.ts
 * @Description:
 *
 */
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const documentOptions = new DocumentBuilder()
  .setTitle('NestJs Example App Documentation')
  .setDescription('The REST API documentation')
  .setVersion('1.0')
  .setBasePath('api')
  .addBearerAuth()
  .build();

async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);
  const document = SwaggerModule.createDocument(app, documentOptions);
  app.setGlobalPrefix('api');
  SwaggerModule.setup('/docs', app, document);
  await app.listen(3000);
}
bootstrap();
