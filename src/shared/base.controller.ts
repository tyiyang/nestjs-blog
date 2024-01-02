/*
 * @Author: tanghao 974958672@qq.com
 * @Date: 2024-01-02 10:44:47
 * @LastEditors: tanghao 974958672@qq.com
 * @LastEditTime: 2024-01-02 10:45:28
 * @FilePath: \real-world\src\shared\base.controller.ts
 * @Description:
 *
 */
import { SECRET } from '../config';
import { verify } from 'jsonwebtoken';

export class BaseController {
  constructor() {}

  protected getUserIdFromToken(authorization) {
    if (!authorization) return null;

    const token = authorization.split(' ')[1];
    const decoded: any = verify(token, SECRET);
    return decoded.id;
  }
}
