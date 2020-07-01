import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('topics')
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  deleted_at: Date;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
