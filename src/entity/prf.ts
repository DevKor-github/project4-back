import { EntitySchema, Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class prf {
  @PrimaryColumn()
  prfId: string;

  @Column()
  fcltyId: string;

  @Column()
  prfName: string;

  @Column()
  prfPeriodFrom: Date;

  @Column()
  prfPeriodTo: Date;

  @Column()
  fcltyName: string;

  @Column()
  prfCast: string;

  @Column()
  prfRuntime: string;

  @Column()
  prfAge: string;

  @Column()
  prfPrice: string;

  @Column()
  prfGenre: string;

  @Column()
  prfState: string;

  @Column()
  prfPoster: string;
}
