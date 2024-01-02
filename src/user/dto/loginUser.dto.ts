/*
 * @Author: tanghao 974958672@qq.com
 * @Date: 2023-12-29 10:59:28
 * @LastEditors: tanghao 974958672@qq.com
 * @LastEditTime: 2023-12-29 11:00:36
 * @FilePath: \real-world\src\user\dto\loginUser.dto.ts
 * @Description:
 *
 */
import { IsNotEmpty } from 'class-validator';
export class LoginUserDto {
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
