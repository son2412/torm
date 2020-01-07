import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany
} from "typeorm";
import { Role } from "./Role";
import { Image } from "./Image";
import jwt from 'jsonwebtoken';
import * as _ from 'lodash';

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  status: number;

  @ManyToMany(() => Role)
  @JoinTable({
    name: "user_role",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "role_id",
      referencedColumnName: "id"
    }
  })
  roles: Role[];

  @OneToMany(() => Image, image => image.user)
  images: Image[]
}
