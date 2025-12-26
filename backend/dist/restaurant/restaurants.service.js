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
exports.RestaurantsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const restaurant_entity_1 = require("./restaurant.entity");
const user_entity_1 = require("../users/user.entity");
let RestaurantsService = class RestaurantsService {
    constructor(repo, userRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
    }
    create(data) {
        const restaurant = this.repo.create(data);
        return this.repo.save(restaurant);
    }
    // findAll() {
    //   return this.repo.find();
    // }
    findAll() {
        return this.repo.find({
            relations: ["manager"], // 👈 REQUIRED
        });
    }
    findOne(id) {
        return this.repo.findOne({ where: { id } });
    }
    update(id, data) {
        return this.repo.update(id, data);
    }
    delete(id) {
        return this.repo.delete(id);
    }
    async findByManager(managerId) {
        const restaurant = await this.repo.findOne({
            where: {
                manager: { id: managerId },
            },
            relations: ['manager'],
        });
        // If manager has no restaurant, return null (frontend will show "Add Restaurant")
        if (!restaurant) {
            return null;
        }
        return restaurant;
    }
    async createForManager(managerId, dto) {
        const manager = await this.userRepo.findOne({ where: { id: managerId } });
        if (!manager)
            throw new common_1.NotFoundException('Manager not found');
        if (manager.role !== user_entity_1.UserRole.MANAGER) {
            throw new common_1.ForbiddenException('Selected user is not a manager');
        }
        // if (!manager.country) {
        //   throw new ForbiddenException('Manager has no country assigned');
        // }
        // if (dto.country !== manager.country) {
        //   throw new ForbiddenException(
        //     `Restaurant must be in the manager’s country (${manager.country})`
        //   );
        // }
        const restaurant = this.repo.create({
            ...dto,
            manager: manager,
        });
        return this.repo.save(restaurant);
    }
    async updateManagerRestaurant(managerId, restId, data) {
        const restaurant = await this.repo.findOne({
            where: { id: restId },
            relations: ['manager'],
        });
        if (!restaurant)
            throw new common_1.NotFoundException('Restaurant not found');
        if (restaurant.manager.id !== managerId) {
            throw new common_1.ForbiddenException('You cannot edit someone else’s restaurant');
        }
        Object.assign(restaurant, data);
        return this.repo.save(restaurant);
    }
};
exports.RestaurantsService = RestaurantsService;
exports.RestaurantsService = RestaurantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(restaurant_entity_1.Restaurant)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RestaurantsService);
