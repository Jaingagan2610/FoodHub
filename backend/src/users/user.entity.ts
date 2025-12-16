import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../orders/order.entity';
import { Restaurant } from '../restaurant/restaurant.entity';
import { CartItem } from '../cart/cart.entity';

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  MEMBER = 'member',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;  // <-- FIXED

  @Column()
  name!: string; // <-- FIXED

  @Column({ unique: true })
  email!: string; // <-- FIXED

  @Column()
  password!: string; // <-- FIXED

  @Column({ type: 'enum', enum: UserRole, default: UserRole.MEMBER })
  role!: UserRole; // <-- FIXED
  
  @Column({ type: 'varchar', length: 2, nullable: true })
  country?: string; // 'IN' | 'US' etc.

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

  @OneToMany(() => Restaurant, (restaurant) => restaurant.manager)
  restaurants!: Restaurant[];

  @OneToMany(() => CartItem,(cartItems) => cartItems.user)
  cartItems!: CartItem[]
}
