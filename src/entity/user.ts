import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn()
  userid: string;

  @Column()
  username: string;

  @Column()
  userpassword: string;

  @Column({ nullable: true })
  refreshtoken: string;
}
