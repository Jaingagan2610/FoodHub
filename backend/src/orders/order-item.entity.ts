import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { MenuItem } from '../menu/menu-item.entity';
import { Order } from './order.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => MenuItem, { eager: true })
  menuItem!: MenuItem;

  @Column()
  quantity!: number;

  @Column()
  price!: number; // price per item

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  order!: Order;
}
