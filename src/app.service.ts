/*
 * @Author: tanghao 974958672@qq.com
 * @Date: 2023-12-27 09:41:54
 * @LastEditors: tanghao 974958672@qq.com
 * @LastEditTime: 2023-12-27 10:03:01
 * @FilePath: \real-world\src\app.service.ts
 * @Description:
 *
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
