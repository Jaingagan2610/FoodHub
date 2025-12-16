import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from './menu-item.entity';
import { Restaurant } from '../restaurant/restaurant.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuItem)
    private menuRepo: Repository<MenuItem>,

    @InjectRepository(Restaurant)
    private restaurantRepo: Repository<Restaurant>,
  ) {}

  async create(data:any) {
    const restaurant = await this.restaurantRepo.findOne({
      where: { id: data.restaurantId },
    });

    if (!restaurant) throw new NotFoundException('Restaurant not found');

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

  findByRestaurant(restaurantId: string) {
    return this.menuRepo.find({
      where: { restaurant: { id: restaurantId } },
    });
  }

  update(id: number, data:any) {
    return this.menuRepo.update(id, data);
  }

  delete(id: number) {
    return this.menuRepo.delete(id);
  }

  async createForManager(managerId: string, data:any) {
  const restaurant = await this.restaurantRepo.findOne({
    where: { id: data.restaurantId },
    relations: ['manager'],
  });

  if (!restaurant) {
    throw new NotFoundException('Restaurant not found');
  }

  if (restaurant.manager.id !== managerId) {
    throw new ForbiddenException('You can add menu only to your own restaurant');
  }

  const menuItem = this.menuRepo.create({
    ...data,
    restaurant,
  });

  return this.menuRepo.save(menuItem);
}

}
