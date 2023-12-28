/*
 * @Author: tanghao 974958672@qq.com
 * @Date: 2023-12-27 15:19:26
 * @LastEditors: tanghao 974958672@qq.com
 * @LastEditTime: 2023-12-27 15:20:40
 * @FilePath: \real-world\src\user\user.interface.ts
 * @Description:
 *
 */
export interface UserData {
  username: string;
  email: string;
  token: string;
  bio: string;
  image?: string;
}

export interface UserRO {
  user: UserData;
}
