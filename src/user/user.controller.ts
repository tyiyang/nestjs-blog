import { HttpException } from '@nestjs/common/exceptions/http.exception';
/*
 * @Author: tanghao 974958672@qq.com
 * @Date: 2023-12-27 14:13:55
 * @LastEditors: tanghao 974958672@qq.com
 * @LastEditTime: 2024-01-02 09:59:15
 * @FilePath: \real-world\src\user\user.controller.ts
 * @Description:
 *
 */
import {
  Post,
  Get,
  Put,
  Delete,
  Param,
  Controller,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { User } from './user.decorator';
import { UserRO } from './user.interface';
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  // add new user
  @Post('users')
  async create(@Body('user') userData: CreateUserDto): Promise<any> {
    return this.userService.create(userData);
  }
  // get user information
  @Get('user')
  async findMe(@User('email') email: string): Promise<any> {
    return this.userService.findByEmail(email);
  }

  @Put('user')
  async update(
    @User('id') userId: number,
    @Body('user') userData: UpdateUserDto,
  ) {
    return await this.userService.update(userId, userData);
  }

  @Delete('users/:email')
  async delete(@Param() params) {
    return this.userService.delete(params.email);
  }

  @Post('users/login')
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserRO> {
    const userAcc = await this.userService.findOne(loginUserDto);
    const errors = { User: 'not found' };
    if (!userAcc) throw new HttpException({ errors }, 401);

    const token = await this.userService.generateJWT(userAcc);
    const { email, username, bio, image } = userAcc;
    const user = {
      email,
      username,
      bio,
      image,
      token,
    };
    return { user };
  }
}
