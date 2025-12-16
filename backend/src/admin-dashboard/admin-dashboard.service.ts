import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Restaurant } from '../restaurant/restaurant.entity';
import { MenuItem } from '../menu/menu-item.entity';
import { Order } from '../orders/order.entity';
import { Payment } from '../payments/payments.entity';

@Injectable()
export class AdminDashboardService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Restaurant) private restRepo: Repository<Restaurant>,
    @InjectRepository(MenuItem) private menuRepo: Repository<MenuItem>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Payment) private payRepo: Repository<Payment>,
  ) {}

  async getDashboardStats() {
    const totalUsers = await this.userRepo.count();
    const totalRestaurants = await this.restRepo.count();
    const totalMenuItems = await this.menuRepo.count();
    const totalOrders = await this.orderRepo.count();

    const totalRevenue = await this.payRepo
      .createQueryBuilder('payment')
      .select('SUM(payment.amount)', 'sum')
      .getRawOne();

    const pendingOrders = await this.orderRepo.count({
      where: { status: 'pending' },
    });

    const confirmedOrders = await this.orderRepo.count({
      where: { status: 'confirmed' },
    });

    const deliveredOrders = await this.orderRepo.count({
      where: { status: 'delivered' },
    });

    return {
      totalUsers,
      totalRestaurants,
      totalMenuItems,
      totalOrders,
      totalRevenue: Number(totalRevenue.sum) || 0,
      pendingOrders,
      confirmedOrders,
      deliveredOrders,
    };
  }

  async getSalesGraph() {
    return await this.payRepo
      .createQueryBuilder('payment')
      .select("DATE(payment.createdAt)", "date")
      .addSelect("SUM(payment.amount)", "totalSales")
      .groupBy("DATE(payment.createdAt)")
      .orderBy("DATE(payment.createdAt)", "ASC")
      .getRawMany();
  }
}
