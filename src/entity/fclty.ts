import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Prf } from "./prf";
@Entity()
export class Fclty {
  @PrimaryColumn()
  fcltyId: string;

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

  @OneToMany((type) => Prf, (prf) => prf.fclty)
  prfs: Prf[];
}
