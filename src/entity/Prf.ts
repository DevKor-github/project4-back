import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Prf {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name: string

    @Column()
    prfpdfrom: Date

    @Column()
    prfpdto: Date

    @Column()
    price: number

    @Column()
    runtime: number

    @Column()
    dtguidance: Date

}
