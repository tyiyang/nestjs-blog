/*
 * @Author: tanghao 974958672@qq.com
 * @Date: 2023-12-28 10:51:04
 * @LastEditors: tanghao 974958672@qq.com
 * @LastEditTime: 2023-12-28 11:10:54
 * @FilePath: \real-world\src\user\user.decorator.ts
 * @Description:
 *
 */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { SECRET } from '../config';
export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  console.log('🚀 ~ file: user.decorator.ts:15 ~ User ~ req:', req.user);
  // if route is protected, there is a user set in auth.middleware
  if (!!req.user) {
    return !!data ? req.user[data] : req.user;
  }

  // in case a route is not protected, we still want to get the optional auth user from jwt
  const token = req.headers.authorization
    ? (req.headers.authorization as string).split(' ')
    : null;
  if (token && token[1]) {
    const decoded: any = verify(token[1], SECRET);
    console.log('🚀 ~ file: user.decorator.ts:27 ~ User ~ decoded:', decoded);
    return !!data ? decoded[data] : decoded.user;
  }
});
