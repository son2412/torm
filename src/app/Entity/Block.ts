import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, BaseEntity } from 'typeorm';
import { User } from '.';

@Entity('blocks')
export class Block extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  blocker_id: number;

  @Column()
  target_id: number;

  @Column()
  deleted_at: Date;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'blocker_id', referencedColumnName: 'id' })
  blocker: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'target_id', referencedColumnName: 'id' })
  target: User;
}
