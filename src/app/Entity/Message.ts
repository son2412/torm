import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne, BaseEntity } from 'typeorm';
import { User } from '.';
import { Group } from './Group';
export const MESSAGE_TYPE_TEXT = 1;
export const MESSAGE_TYPE_IMAGE = 2;

@Entity('messages')
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sender_id: number;

  @Column()
  group_id: number;

  @Column()
  message: string;

  @Column()
  type: number;

  @Column()
  deleted_at: Date;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'sender_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Group)
  @JoinColumn({ name: 'group_id', referencedColumnName: 'id' })
  group: Group;
}
