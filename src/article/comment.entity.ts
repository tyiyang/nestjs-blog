/*
 * @Author: tanghao 974958672@qq.com
 * @Date: 2023-12-27 13:50:58
 * @LastEditors: tanghao 974958672@qq.com
 * @LastEditTime: 2023-12-27 13:53:47
 * @FilePath: \real-world\src\article\comment.entity.ts
 * @Description:
 *
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ArticleEntity } from './article.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @ManyToOne(() => ArticleEntity, (article) => article.comments)
  article: ArticleEntity;
}
