/*
 * @Author: tanghao 974958672@qq.com
 * @Date: 2023-12-27 15:11:17
 * @LastEditors: tanghao 974958672@qq.com
 * @LastEditTime: 2023-12-28 10:25:49
 * @FilePath: \real-world\src\user\user.service.ts
 * @Description:
 *
 */
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { Injectable, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { validate } from 'class-validator';
import { CreateUserDto } from './dto/createUser.dto';
import { UserRO } from './user.interface';
import { UserEntity } from './user.entity';
import { SECRET } from '../config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(dto: CreateUserDto): Promise<UserRO> {
    const { username, email, password } = dto;
    Logger.debug('username', username);
    const qb = this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .orWhere('user.email = :email', { email });

    const user = await qb.getOne();
    if (user) {
      const errors = { username: 'Username and email must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = new UserEntity();
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;
    newUser.articles = [];

    const errors = await validate(newUser);
    if (errors.length > 0) {
      const _errors = { username: 'Userinput is not valid.' };
      throw new HttpException(
        { message: 'Input data validation failed', _errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const savedUser = await this.userRepository.save(newUser);
      return this.buildUserRO(savedUser);
    }
  }

  public generateJWT(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        exp: exp.getTime() / 1000,
      },
      SECRET,
    );
  }

  private buildUserRO(user: UserEntity) {
    const userRO = {
      id: user.id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      token: this.generateJWT(user),
      image: user.image,
    };

    return { user: userRO };
  }
}
