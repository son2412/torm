import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, BaseEntity } from 'typeorm';
import { User } from '.';

@Entity('images')
export class Image extends BaseEntity {
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
