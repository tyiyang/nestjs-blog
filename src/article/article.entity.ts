/*
 * @Author: tanghao 974958672@qq.com
 * @Date: 2023-12-27 11:38:06
 * @LastEditors: tanghao 974958672@qq.com
 * @LastEditTime: 2023-12-27 13:54:50
 * @FilePath: \real-world\src\article\article.entity.ts
 * @Description:文章实体
 *
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { Comment } from './comment.entity';
@Entity('articles')
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
  updateTimeStamp() {
    this.updated = new Date();
  }

  @Column('simple-array')
  tagList: string[];
  @ManyToOne(() => UserEntity, (user) => user.articles)
  author: UserEntity;

  @OneToMany(() => Comment, (comment) => comment.article, { eager: true })
  @JoinColumn()
  comments: Comment[];

  @Column({ default: 0 })
  favoriteCount: number;
}
