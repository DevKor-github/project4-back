import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class prf {
    @PrimaryColumn()
    prfId: string;

    @Column()
    prfName: string;

    @Column()
    prfSdate: Date;

    @Column()
    prfEdate: Date;

    @Column()
    prfStage: string;

    @Column()
    prfGenre: string;
}
