"use strict";
// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Payment } from './payments.entity';
// import { Order } from '../orders/order.entity';
// import Razorpay from 'razorpay';
// import { CreatePaymentDto } from './dto/create-payment.dto';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
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
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const razorpay_1 = __importDefault(require("razorpay"));
const payments_entity_1 = require("./payments.entity");
const order_entity_1 = require("../orders/order.entity");
const config_1 = require("@nestjs/config");
let PaymentsService = class PaymentsService {
    constructor(config, payRepo, orderRepo) {
        this.config = config;
        this.payRepo = payRepo;
        this.orderRepo = orderRepo;
        this.razorpay = new razorpay_1.default({
            // key_id: process.env.RAZORPAY_KEY_ID,
            // key_secret: process.env.RAZORPAY_KEY_SECRET,
            //   key_id: String(process.env.RAZORPAY_KEY_ID),
            // key_secret: String(process.env.RAZORPAY_KEY_SECRET),
            key_id: this.config.get('RAZORPAY_KEY_ID'),
            key_secret: this.config.get('RAZORPAY_KEY_SECRET'),
        });
        console.log("🔑 Razorpay Key:", this.config.get('RAZORPAY_KEY_ID'));
        console.log("🔑 Razorpay Secret:", this.config.get('RAZORPAY_KEY_SECRET'));
    }
    createOrder(amount) {
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
    async createRazorpayOrder(amount) {
        if (!amount)
            throw new Error("Amount is required");
        const options = {
            amount: amount * 100, // convert to paisa
            currency: 'INR',
            receipt: 'receipt_' + Date.now(),
        };
        return await this.razorpay.orders.create(options);
    }
    async payForOrder(userId, dto) {
        const order = await this.orderRepo.findOne({
            where: { id: dto.orderId },
            relations: ['user'],
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (order.user.id !== userId) {
            throw new common_1.NotFoundException('Cannot pay for someone else’s order');
        }
        const payment = this.payRepo.create({
            order,
            amount: order.totalPrice,
            status: 'success',
            transactionId: dto.razorpay_payment_id,
        });
        return this.payRepo.save(payment);
    }
    findMyPayments(userId) {
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
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(payments_entity_1.Payment)),
    __param(2, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PaymentsService);
