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
exports.AdminDashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
const restaurant_entity_1 = require("../restaurant/restaurant.entity");
const menu_item_entity_1 = require("../menu/menu-item.entity");
const order_entity_1 = require("../orders/order.entity");
const payments_entity_1 = require("../payments/payments.entity");
let AdminDashboardService = class AdminDashboardService {
    constructor(userRepo, restRepo, menuRepo, orderRepo, payRepo) {
        this.userRepo = userRepo;
        this.restRepo = restRepo;
        this.menuRepo = menuRepo;
        this.orderRepo = orderRepo;
        this.payRepo = payRepo;
    }
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
};
exports.AdminDashboardService = AdminDashboardService;
exports.AdminDashboardService = AdminDashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(restaurant_entity_1.Restaurant)),
    __param(2, (0, typeorm_1.InjectRepository)(menu_item_entity_1.MenuItem)),
    __param(3, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(4, (0, typeorm_1.InjectRepository)(payments_entity_1.Payment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AdminDashboardService);
