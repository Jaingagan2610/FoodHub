import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Order } from '../orders/order.entity';

@Entity('payments')
export class Payment {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => Order, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  order!: Order;

  @Column()
  amount!: number;

  @Column({ default: 'pending' })
  status!: string;  // pending, success, failed

  @Column({ nullable: true })
  transactionId!: string;  // if you integrate Stripe/Razorpay later

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
