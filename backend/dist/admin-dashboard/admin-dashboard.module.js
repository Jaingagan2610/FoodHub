"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminDashboardModule = void 0;
const common_1 = require("@nestjs/common");
const admin_dashboard_service_1 = require("./admin-dashboard.service");
const admin_dashboard_controller_1 = require("./admin-dashboard.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/user.entity");
const restaurant_entity_1 = require("../restaurant/restaurant.entity");
const menu_item_entity_1 = require("../menu/menu-item.entity");
const order_entity_1 = require("../orders/order.entity");
const order_item_entity_1 = require("../orders/order-item.entity");
const payments_entity_1 = require("../payments/payments.entity");
let AdminDashboardModule = class AdminDashboardModule {
};
exports.AdminDashboardModule = AdminDashboardModule;
exports.AdminDashboardModule = AdminDashboardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                restaurant_entity_1.Restaurant,
                menu_item_entity_1.MenuItem,
                order_entity_1.Order,
                order_item_entity_1.OrderItem,
                payments_entity_1.Payment
            ])
        ],
        controllers: [admin_dashboard_controller_1.AdminDashboardController],
        providers: [admin_dashboard_service_1.AdminDashboardService],
    })
], AdminDashboardModule);
