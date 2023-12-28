/*
 * @Author: tanghao 974958672@qq.com
 * @Date: 2023-12-28 11:14:09
 * @LastEditors: tanghao 974958672@qq.com
 * @LastEditTime: 2023-12-28 11:16:31
 * @FilePath: \real-world\src\user\auth.middleware.ts
 * @Description:
 *
 */
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET } from '../config';
import { UserService } from './user.service';
import { UserData, UserRO } from './user.interface';
interface ICustomRequest extends Request {
  headers: any;
  user: UserData;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: ICustomRequest, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;

    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      const decoded: any = verify(token, SECRET);
      const user: UserRO = await this.userService.findById(decoded.id);

      if (!user) {
        throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
      }

      req.user = user.user;
      next();
    } else {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
