import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    num_id: string

    @Column()
    id: string

    @Column()
    name: string

    @Column()
    password: string

}