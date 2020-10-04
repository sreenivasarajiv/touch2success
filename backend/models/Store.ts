import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Customer } from "./Customer";
import { States } from "./States";

@Index("StateId", ["stateId"], {})
@Entity("store", { schema: "srajivdemodb" })
export class Store {
  @Column("int", { primary: true, name: "Id" })
  id: number;

  @Column("varchar", { name: "Phone", length: 50 })
  phone: string;

  @Column("varchar", { name: "Name", length: 250 })
  name: string;

  @Column("varchar", { name: "Domain", length: 250 })
  domain: string;

  @Column("tinyint", { name: "Status", width: 1, default: () => "'1'" })
  status: boolean;

  @Column("varchar", { name: "Street", length: 250 })
  street: string;

  @Column("varchar", { name: "State", length: 50 })
  state: string;

  @Column("int", { name: "StateId", nullable: true })
  stateId: number | null;

  @OneToMany(() => Customer, (customer) => customer.store)
  customers: Customer[];

  @ManyToOne(() => States, (states) => states.stores, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "StateId", referencedColumnName: "id" }])
  state2: States;
}
