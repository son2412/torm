import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from 'typeorm';
import { User } from './User';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageable_id: number;

  @Column()
  imageable_type: number;

  @Column()
  url: string;

  @Column()
  type: number;

  @Column()
  deleted_at: Date;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'imageable_id', referencedColumnName: 'id' })
  user: User;
}
