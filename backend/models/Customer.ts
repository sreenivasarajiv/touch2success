import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Store } from "./Store";

@Index("StoreId", ["storeId"], {})
@Entity("customer", { schema: "srajivdemodb" })
export class Customer {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("int", { name: "StoreId" })
  storeId: number;

  @Column("varchar", { name: "Firstname", length: 50 })
  firstname: string;

  @Column("varchar", { name: "Lastname", length: 50 })
  lastname: string;

  @Column("varchar", { name: "Phone", length: 50 })
  phone: string;

  @Column("varchar", { name: "Email", length: 100 })
  email: string;

  @ManyToOne(() => Store, (store) => store.customers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "StoreId", referencedColumnName: "id" }])
  store: Store;
}
