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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cart_entity_1 = require("./cart.entity");
const user_entity_1 = require("../users/user.entity");
const menu_item_entity_1 = require("../menu/menu-item.entity");
let CartService = class CartService {
    constructor(cartRepo, userRepo, menuRepo) {
        this.cartRepo = cartRepo;
        this.userRepo = userRepo;
        this.menuRepo = menuRepo;
    }
    async addItem(userId, dto) {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        const menuItem = await this.menuRepo.findOne({
            where: { id: dto.menuItemId },
        });
        if (!menuItem)
            throw new common_1.NotFoundException("Menu item not found");
        let existing = await this.cartRepo.findOne({
            where: { user: { id: userId }, menuItem: { id: dto.menuItemId } },
        });
        if (existing) {
            existing.quantity += dto.quantity;
            return this.cartRepo.save(existing);
        }
        const cartItem = this.cartRepo.create({
            user,
            menuItem,
            quantity: dto.quantity,
            price: menuItem.price,
        });
        return this.cartRepo.save(cartItem);
    }
    async getUserCart(userId) {
        return this.cartRepo.find({
            where: { user: { id: userId } },
        });
    }
    async updateItem(id, userId, dto) {
        // 1. Get cart item with user relation
        const item = await this.cartRepo.findOne({
            where: { id, user: { id: userId } },
            relations: ["menuItem", "user"],
        });
        if (!item)
            throw new common_1.NotFoundException("Cart item not found");
        // 2. If menuItemId is present → update menu item reference
        if (dto.menuItemId) {
            const menuItem = await this.menuRepo.findOne({
                where: { id: dto.menuItemId },
            });
            if (!menuItem)
                throw new common_1.NotFoundException("Menu item not found");
            item.menuItem = menuItem;
            item.price = menuItem.price; // update price snapshot
        }
        // 3. Update quantity
        if (dto.quantity !== undefined) {
            item.quantity = dto.quantity;
        }
        // 4. Save
        return await this.cartRepo.save(item);
    }
    async removeItem(id, userId) {
        const item = await this.cartRepo.findOne({
            where: { id, user: { id: userId } },
        });
        if (!item)
            throw new common_1.NotFoundException("Cart item not found");
        return this.cartRepo.remove(item);
    }
    async clearCart(userId) {
        const items = await this.getUserCart(userId);
        return this.cartRepo.remove(items);
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.CartItem)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(menu_item_entity_1.MenuItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CartService);
