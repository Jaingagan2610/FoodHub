import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CartItem } from "./cart.entity";
import { User } from "../users/user.entity";
import { MenuItem } from "../menu/menu-item.entity";
import { CreateCartItemDto } from "./dto/create-cart-item.dto";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private cartRepo: Repository<CartItem>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(MenuItem)
    private menuRepo: Repository<MenuItem>
  ) {}

  async addItem(userId: string, dto: CreateCartItemDto) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException("User not found");

    const menuItem = await this.menuRepo.findOne({
      where: { id: dto.menuItemId },
    });
    if (!menuItem) throw new NotFoundException("Menu item not found");

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

  async getUserCart(userId: string) {
    return this.cartRepo.find({
      where: { user: { id: userId } },
    });
  }

  async updateItem(id: string, userId: string, dto: CreateCartItemDto) {
  // 1. Get cart item with user relation
  const item = await this.cartRepo.findOne({
    where: { id, user: { id: userId } },
    relations: ["menuItem", "user"],
  });

  if (!item) throw new NotFoundException("Cart item not found");

  // 2. If menuItemId is present → update menu item reference
  if (dto.menuItemId) {
    const menuItem = await this.menuRepo.findOne({
      where: { id: dto.menuItemId },
    });

    if (!menuItem) throw new NotFoundException("Menu item not found");

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

   


  async removeItem(id: string, userId: string) {
    const item = await this.cartRepo.findOne({
      where: { id, user: { id: userId } },
    });

    if (!item) throw new NotFoundException("Cart item not found");

    return this.cartRepo.remove(item);
  }

  async clearCart(userId: string) {
    const items = await this.getUserCart(userId);
    return this.cartRepo.remove(items);
  }
}
