/*
 * @Author: tanghao 974958672@qq.com
 * @Date: 2023-12-27 14:13:55
 * @LastEditors: tanghao 974958672@qq.com
 * @LastEditTime: 2023-12-27 15:13:40
 * @FilePath: \real-world\src\user\user.controller.ts
 * @Description:
 *
 */
import { Post, Controller, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('users')
  async create(@Body('user') userData: CreateUserDto): Promise<any> {
    return this.userService.create(userData);
  }
}
