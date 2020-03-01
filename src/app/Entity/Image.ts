import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Role } from './Role';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url!: string;

  @Column()
  imageable_id: number;

  @Column()
  imageable_type: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'imageable_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'imageable_id', referencedColumnName: 'id' })
  role: Role;
}
