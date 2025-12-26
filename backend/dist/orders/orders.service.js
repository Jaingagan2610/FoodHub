"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./order.entity");
const order_item_entity_1 = require("./order-item.entity");
const menu_item_entity_1 = require("../menu/menu-item.entity");
const user_entity_1 = require("../users/user.entity");
let OrdersService = class OrdersService {
    constructor(orderRepo, itemRepo, menuRepo, userRepo) {
        this.orderRepo = orderRepo;
        this.itemRepo = itemRepo;
        this.menuRepo = menuRepo;
        this.userRepo = userRepo;
    }
    async create(userId, data) {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        let total = 0;
        const items = [];
        for (const item of data.menuItems) {
            const menuItem = await this.menuRepo.findOne({
                where: { id: item.menuItemId },
                relations: ['restaurant'], // IMPORTANT to access restaurant.country
            });
            if (!menuItem)
                throw new common_1.NotFoundException("Menu item not found");
            const restaurant = menuItem.restaurant;
            // 🟩 ROLE + COUNTRY ACCESS CHECKS
            // Admin = can order from any country
            // Manager = only within their country
            // Member  = only within their country (recommended for relational access)
            // if (user.role === UserRole.MANAGER || user.role === UserRole.MEMBER) {
            //   if (!user.country) {
            //     throw new ForbiddenException("User has no country assigned");
            //   }
            //   if (user.country !== restaurant.country) {
            //     throw new ForbiddenException(
            //       `You cannot create an order for restaurants outside your country (${user.country}).`
            //     );
            //   }
            // }
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
    findMyOrders(userId) {
        return this.orderRepo.find({
            where: { user: { id: userId } },
            relations: ['items', 'items.menuItem'],
        });
    }
    findAll() {
        return this.orderRepo.find({
            relations: ['items', 'items.menuItem', 'user', 'items.menuItem.restaurant'],
        });
    }
    async updateStatus(orderId, status) {
        const order = await this.orderRepo.findOne({
            where: { id: orderId },
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        order.status = status;
        return this.orderRepo.save(order);
    }
    // async findForManager(managerId: string) {
    //   const orders = await this.orderRepo.find({
    //     relations: ['items', 'items.menuItem', 'user', 'items.menuItem.restaurant']
    //   });
    //   return orders.filter(order => 
    //     order.items.some(i => i.menuItem.restaurant.manager.id === managerId)
    //   );
    // }
    async findOrdersForManager(managerId) {
        return this.orderRepo
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.items', 'item')
            .leftJoinAndSelect('item.menuItem', 'menuItem')
            .leftJoinAndSelect('menuItem.restaurant', 'restaurant')
            .leftJoinAndSelect('order.user', 'user')
            .where('restaurant.managerId = :managerId', { managerId })
            .orderBy('order.createdAt', 'DESC')
            .getMany();
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __param(2, (0, typeorm_1.InjectRepository)(menu_item_entity_1.MenuItem)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrdersService);
