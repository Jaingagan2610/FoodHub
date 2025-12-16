import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from "../users/user.entity";
import { MenuItem } from "../menu/menu-item.entity";


@Entity()
export class CartItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  quantity: number;

  @Column()
  price: number; // menu price snapshot

  @ManyToOne(() => User, (user) => user.cartItems, { eager: true })
  user: User;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.cartItems, { eager: true })
  menuItem: MenuItem;

}
