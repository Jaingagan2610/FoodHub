// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Payment } from './payments.entity';
// import { Order } from '../orders/order.entity';
// import Razorpay from 'razorpay';
// import { CreatePaymentDto } from './dto/create-payment.dto';

// @Injectable()
// export class PaymentsService {
//    private razorpay: Razorpay;
//   constructor(
//     @InjectRepository(Payment) private payRepo: Repository<Payment>,
//     @InjectRepository(Order) private orderRepo: Repository<Order>,
//   ) {
//      this.razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET,
//     })

//   }
//   createOrder(amount: number) {
//     throw new Error('Method not implemented.');
//   }

//   async createRazorpayOrder(amount: number) {
//     const options = {
//       amount: amount * 100,
//       currency: 'INR',
//       receipt: 'receipt_' + Date.now(),
//     };

//     return await this.razorpay.orders.create(options);
//   }

//   async payForOrder(userId: string, data: { orderId: string; razorpay_payment_id: string }) {
//     const order = await this.orderRepo.findOne({
//       where: { id: data.orderId },
//       relations: ['user'],
//     });

//     if (!order) throw new NotFoundException('Order not found');

//     if (order.user.id !== userId) {
//       throw new NotFoundException('Cannot pay for someone else’s order');
//     }

//     const payment = this.payRepo.create({
//       order,
//       amount: order.totalPrice,
//       status: 'success',
//       transactionId: data.razorpay_payment_id,
//     });

//     return await this.payRepo.save(payment);
//   }

//   findMyPayments(userId: string) {
//     return this.payRepo.find({
//       where: { order: { user: { id: userId } } },
//       relations: ['order'],
//     });
//   }

//   findAll() {
//     return this.payRepo.find({
//       relations: ['order', 'order.items', 'order.user'],
//     });
//   }
// }


import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Razorpay from 'razorpay';
import { Payment } from './payments.entity';
import { Order } from '../orders/order.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentsService {
  private razorpay: Razorpay;

  constructor(
     private config: ConfigService,
    @InjectRepository(Payment) private payRepo: Repository<Payment>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
  ) {
    this.razorpay = new Razorpay({
      // key_id: process.env.RAZORPAY_KEY_ID,
      // key_secret: process.env.RAZORPAY_KEY_SECRET,
    //   key_id: String(process.env.RAZORPAY_KEY_ID),
    // key_secret: String(process.env.RAZORPAY_KEY_SECRET),
    key_id: this.config.get<string>('RAZORPAY_KEY_ID'),
      key_secret: this.config.get<string>('RAZORPAY_KEY_SECRET'),
    });
     console.log("🔑 Razorpay Key:", this.config.get<string>('RAZORPAY_KEY_ID'));
     console.log("🔑 Razorpay Secret:", this.config.get<string>('RAZORPAY_KEY_SECRET'));
  }

   createOrder(amount: number) {
  throw new Error('Method not implemented.');
}

  //   async createRazorpayOrder(amount: number) {
  //   const options = {
  //     amount: amount * 100,
  //     currency: 'INR',
  //     receipt: 'receipt_' + Date.now(),
  //   };

  //   return await this.razorpay.orders.create(options);
  // }
  async createRazorpayOrder(amount: number) {
  if (!amount) throw new Error("Amount is required");

  const options = {
    amount: amount * 100, // convert to paisa
    currency: 'INR',
    receipt: 'receipt_' + Date.now(),
  };

  return await this.razorpay.orders.create(options);
}


  async payForOrder(userId: string, dto: any) {
    const order = await this.orderRepo.findOne({
      where: { id: dto.orderId },
      relations: ['user'],
    });

    if (!order) throw new NotFoundException('Order not found');
    if (order.user.id !== userId) {
      throw new NotFoundException('Cannot pay for someone else’s order');
    }

    const payment = this.payRepo.create({
      order,
      amount: order.totalPrice,
      status: 'success',
      transactionId: dto.razorpay_payment_id,
    });

    return this.payRepo.save(payment);
  }

  findMyPayments(userId: string) {
    return this.payRepo.find({
      where: { order: { user: { id: userId } } },
      relations: ['order'],
    });
  }

  findAll() {
    return this.payRepo.find({
      relations: ['order', 'order.items', 'order.user'],
    });
  }
}
