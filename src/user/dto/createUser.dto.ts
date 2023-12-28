/*
 * @Author: tanghao 974958672@qq.com
 * @Date: 2023-12-27 15:07:21
 * @LastEditors: tanghao 974958672@qq.com
 * @LastEditTime: 2023-12-27 15:08:39
 * @FilePath: \real-world\src\user\dto\createUser.dto.ts
 * @Description:
 *
 */
import { IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
