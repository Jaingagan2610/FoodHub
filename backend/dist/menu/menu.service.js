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
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const menu_item_entity_1 = require("./menu-item.entity");
const restaurant_entity_1 = require("../restaurant/restaurant.entity");
let MenuService = class MenuService {
    constructor(menuRepo, restaurantRepo) {
        this.menuRepo = menuRepo;
        this.restaurantRepo = restaurantRepo;
    }
    async create(data) {
        const restaurant = await this.restaurantRepo.findOne({
            where: { id: data.restaurantId },
        });
        if (!restaurant)
            throw new common_1.NotFoundException('Restaurant not found');
        const menu = this.menuRepo.create({
            name: data.name,
            description: data.description,
            price: data.price,
            image: data.image,
            restaurant: restaurant,
        });
        return this.menuRepo.save(menu);
    }
    findAll() {
        return this.menuRepo.find({ relations: ['restaurant'] });
    }
    findByRestaurant(restaurantId) {
        return this.menuRepo.find({
            where: { restaurant: { id: restaurantId } },
        });
    }
    update(id, data) {
        return this.menuRepo.update(id, data);
    }
    delete(id) {
        return this.menuRepo.delete(id);
    }
    async createForManager(managerId, data) {
        const restaurant = await this.restaurantRepo.findOne({
            where: { id: data.restaurantId },
            relations: ['manager'],
        });
        if (!restaurant) {
            throw new common_1.NotFoundException('Restaurant not found');
        }
        if (restaurant.manager.id !== managerId) {
            throw new common_1.ForbiddenException('You can add menu only to your own restaurant');
        }
        const menuItem = this.menuRepo.create({
            ...data,
            restaurant,
        });
        return this.menuRepo.save(menuItem);
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(menu_item_entity_1.MenuItem)),
    __param(1, (0, typeorm_1.InjectRepository)(restaurant_entity_1.Restaurant)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MenuService);
