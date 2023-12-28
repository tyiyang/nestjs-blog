/*
 * @Author: tanghao 974958672@qq.com
 * @Date: 2023-12-27 11:15:19
 * @LastEditors: tanghao 974958672@qq.com
 * @LastEditTime: 2023-12-27 13:49:18
 * @FilePath: \real-world\src\user\user.entity.ts
 * @Description:User实体
 *
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import * as argon2 from 'argon2';
import { IsEmail } from 'class-validator';
import { ArticleEntity } from '../article/article.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: '' })
  image: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await argon2.hash(this.password);
  }

  @ManyToMany(() => ArticleEntity)
  @JoinTable()
  favorites: ArticleEntity[];

  @OneToMany(() => ArticleEntity, (article) => article.author)
  articles: ArticleEntity[];
}
