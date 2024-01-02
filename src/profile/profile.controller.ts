/*
 * @Author: tanghao 974958672@qq.com
 * @Date: 2023-12-25 11:21:49
 * @LastEditors: tanghao 974958672@qq.com
 * @LastEditTime: 2024-01-02 15:48:03
 * @FilePath: \real-world\src\profile\profile.controller.ts
 * @Description:
 *
 */
import { Get, Post, Delete, Param, Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { ProfileRO } from './profile.interface';
import { User } from '../user/user.decorator';

@ApiBearerAuth()
@ApiTags('profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':username')
  async getProfile(
    @User('id') userId: number,
    @Param('username') username: string,
  ): Promise<ProfileRO> {
    return await this.profileService.findProfile(userId, username);
  }

  @Post(':username/follow')
  async follow(
    @User('email') email: string,
    @Param('username') username: string,
  ): Promise<ProfileRO> {
    return await this.profileService.follow(email, username);
  }

  @Delete(':username/follow')
  async unFollow(
    @User('id') userId: number,
    @Param('username') username: string,
  ): Promise<ProfileRO> {
    return await this.profileService.unFollow(userId, username);
  }
}
