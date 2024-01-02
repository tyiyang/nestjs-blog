/*
 * @Author: tanghao 974958672@qq.com
 * @Date: 2023-12-27 15:11:17
 * @LastEditors: tanghao 974958672@qq.com
 * @LastEditTime: 2024-01-02 09:55:05
 * @FilePath: \real-world\src\user\user.service.ts
 * @Description:
 *
 */
import * as argon2 from 'argon2';
import { sign } from 'jsonwebtoken';
import { DeleteResult, Repository } from 'typeorm';
import { Injectable, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { validate } from 'class-validator';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
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

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      const errors = { User: 'not found' };
      throw new HttpException({ errors }, 401);
    }
    return this.buildUserRO(user);
  }

  async findById(id: number): Promise<UserRO> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      const errors = { User: ' not found' };
      throw new HttpException({ errors }, 401);
    }

    return this.buildUserRO(user);
  }

  async findOne({ email, password }: LoginUserDto) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) return null;

    const verifyAns = await argon2.verify(user.password, password);
    console.log(
      '🚀 ~ file: user.service.ts:89 ~ UserService ~ findOne ~ verifyAns:',
      verifyAns,
    );
    if (verifyAns) {
      return user;
    }
    return null;
  }

  async update(id: number, dto: UpdateUserDto): Promise<UserEntity> {
    const toUpdate = await this.userRepository.findOneBy({ id });
    delete toUpdate.password;
    delete toUpdate.favorites;
    const updated = Object.assign(toUpdate, dto);
    return await this.userRepository.save(updated);
  }

  async delete(email: string): Promise<DeleteResult> {
    return this.userRepository.delete({ email });
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
