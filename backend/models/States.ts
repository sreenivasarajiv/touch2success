import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Store } from "./Store";

@Entity("states", { schema: "srajivdemodb" })
export class States {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("char", { name: "code", length: 2 })
  code: string;

  @Column("varchar", { name: "name", length: 128 })
  name: string;

  @OneToMany(() => Store, (store) => store.state2)
  stores: Store[];
}
