import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from 'typeorm';
import { User, Group } from '.';

@Entity('messages')
export class Message {
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

  @OneToOne(() => Group)
  @JoinColumn({ name: 'group_id', referencedColumnName: 'id' })
  group: Group;
}
