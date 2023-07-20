import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Prf } from "./prf.js";
@Entity()
export class Fclty {
  @PrimaryColumn()
  fcltyId: string;

  @OneToMany((type) => Prf, (prf) => prf.fclty)
  prfs: Prf[];

  @Column()
  fcltyName: string;

  @Column()
  fcltySeatscale: string;

  @Column()
  fcltyTel: string;

  @Column()
  fcltyUrl: string;

  @Column()
  fcltyAdr: string;

  @Column()
  fcltyla: string;

  @Column()
  fcltylo: string;
}
