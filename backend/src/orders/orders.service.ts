import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { MenuItem } from '../menu/menu-item.entity';
import { User, UserRole } from '../users/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private itemRepo: Repository<OrderItem>,
    @InjectRepository(MenuItem) private menuRepo: Repository<MenuItem>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  // async create(userId: string, data:any) {
  //   const user = await this.userRepo.findOne({ where: { id: userId } });
  //   if (!user) throw new NotFoundException("User not found");

  //   let total = 0;
  //   const items: OrderItem[] = [];

  //   for (const item of data.menuItems) {
  //     const menuItem = await this.menuRepo.findOne({
  //       where: { id: item.menuItemId },
  //     });
  //     if (!menuItem) throw new NotFoundException("Menu item not found");

  //     const orderItem = this.itemRepo.create({
  //       menuItem,
  //       quantity: item.quantity,
  //       price: menuItem.price,
  //     });

  //     total += menuItem.price * item.quantity;
  //     items.push(orderItem);
  //   }

  //   const order = this.orderRepo.create({
  //     user,
  //     items,
  //     totalPrice: total,
  //     status: 'pending',
  //   });

  //   return this.orderRepo.save(order);
  // }
  async create(userId: string, data: any) {
  const user = await this.userRepo.findOne({ where: { id: userId } });
  if (!user) throw new NotFoundException("User not found");

  let total = 0;
  const items: OrderItem[] = [];

  for (const item of data.menuItems) {
    const menuItem = await this.menuRepo.findOne({
      where: { id: item.menuItemId },
      relations: ['restaurant'],   // IMPORTANT to access restaurant.country
    });
    if (!menuItem) throw new NotFoundException("Menu item not found");

    const restaurant = menuItem.restaurant;

    // 🟩 ROLE + COUNTRY ACCESS CHECKS
    // Admin = can order from any country
    // Manager = only within their country
    // Member  = only within their country (recommended for relational access)
    if (user.role === UserRole.MANAGER || user.role === UserRole.MEMBER) {
      if (!user.country) {
        throw new ForbiddenException("User has no country assigned");
      }
      if (user.country !== restaurant.country) {
        throw new ForbiddenException(
          `You cannot create an order for restaurants outside your country (${user.country}).`
        );
      }
    }

    const orderItem = this.itemRepo.create({
      menuItem,
      quantity: item.quantity,
      price: menuItem.price,
    });

    total += menuItem.price * item.quantity;
    items.push(orderItem);
  }

  const order = this.orderRepo.create({
    user,
    items,
    totalPrice: total,
    status: 'pending',
  });

  return this.orderRepo.save(order);
}


  findMyOrders(userId: string) {
    return this.orderRepo.find({
      where: { user: { id: userId } },
      relations: ['items', 'items.menuItem'],
    });
  }

  findAll() {
    return this.orderRepo.find({
      relations: ['items', 'items.menuItem', 'user'],
    });
  }

  async updateStatus(orderId: string, status: string) {
  const order = await this.orderRepo.findOne({
    where: { id: orderId },
  });

  if (!order) {
    throw new NotFoundException('Order not found');
  }

  order.status = status;

  return this.orderRepo.save(order);
}

async findForManager(managerId: string) {

  const orders = await this.orderRepo.find({
    relations: ['items', 'items.menuItem', 'user', 'items.menuItem.restaurant']
  });

  return orders.filter(order => 
    order.items.some(i => i.menuItem.restaurant.manager.id === managerId)
  );
}


}
