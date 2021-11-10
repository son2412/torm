import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, BaseEntity } from 'typeorm';
import { Role, Image } from '.';
import { Group } from './Group';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @Column()
  phone: string;

  @Column()
  birthday: string;

  @Column()
  gender: number;

  @Column()
  password: string;

  @Column()
  social_id: string;

  @Column()
  login_type: number;

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

  @OneToOne(() => Image, (image) => image.user)
  image: Image;

  @ManyToMany(() => Group)
  @JoinTable({
    name: 'user_group',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'group_id',
      referencedColumnName: 'id'
    }
  })
  groups: Group[];

  toJSON() {
    delete this.password;
    delete this.social_id;
    return this;
  }
}
