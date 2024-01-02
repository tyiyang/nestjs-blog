/*
 * @Author: tanghao 974958672@qq.com
 * @Date: 2024-01-02 10:33:28
 * @LastEditors: tanghao 974958672@qq.com
 * @LastEditTime: 2024-01-02 15:47:15
 * @FilePath: \real-world\src\tag\tag.controller.ts
 * @Description:
 *
 */
import { Get, Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TagEntity } from './tag.entity';
import { TagService } from './tag.service';

@ApiBearerAuth()
@ApiTags('tags')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAll(): Promise<TagEntity[]> {
    return await this.tagService.findAll();
  }
}
