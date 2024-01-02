/*
 * @Author: tanghao 974958672@qq.com
 * @Date: 2024-01-02 10:48:50
 * @LastEditors: tanghao 974958672@qq.com
 * @LastEditTime: 2024-01-02 10:52:25
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

  @ManyToOne((type) => ArticleEntity, (article) => article.comments)
  article: ArticleEntity;
}
