import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  commentable_id: number;

  @Column()
  parent_id: number;

  @Column()
  content: string;

  @Column()
  deleted_at: Date;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
