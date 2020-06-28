import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne } from 'typeorm';
import { Role, Image } from '.';
import * as _ from 'lodash';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  birth: string;

  @Column()
  gender: number;

  @Column()
  password: string;

  @Column()
  status: number;

  @Column()
  deleted_at: Date;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_role',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id'
    }
  })
  roles: Role[];

  @OneToOne(
    () => Image,
    image => image.user
  )
  image: Image;
}
