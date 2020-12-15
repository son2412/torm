import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, BaseEntity } from 'typeorm';
import { User } from '.';

@Entity('devices')
export class Device extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  token: string;

  @Column()
  platform: string;

  @Column()
  deleted_at: Date;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

}
