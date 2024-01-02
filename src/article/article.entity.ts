/*
 * @Author: tanghao 974958672@qq.com
 * @Date: 2024-01-02 10:48:50
 * @LastEditors: tanghao 974958672@qq.com
 * @LastEditTime: 2024-01-02 10:51:44
 * @FilePath: \real-world\src\article\article.entity.ts
 * @Description:
 *
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  BeforeUpdate,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { Comment } from './comment.entity';

@Entity('article')
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  title: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: '' })
  body: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated = new Date();
  }

  @Column('simple-array')
  tagList: string[];

  @ManyToOne((type) => UserEntity, (user) => user.articles)
  author: UserEntity;

  @OneToMany((type) => Comment, (comment) => comment.article, { eager: true })
  @JoinColumn()
  comments: Comment[];

  @Column({ default: 0 })
  favoriteCount: number;
}
