import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Fclty } from "./fclty";

@Entity()
export class Prf {
  @PrimaryColumn()
  prfId: string;

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

  @ManyToOne((type) => Fclty, (fclty) => fclty.prfs)
  fclty: Fclty;
}
