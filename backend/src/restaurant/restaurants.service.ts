import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { User, UserRole } from '../users/user.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private repo: Repository<Restaurant>,

      @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  create(data:any) {
    const restaurant = this.repo.create(data);
    return this.repo.save(restaurant);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  update(id: number, data:any) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
  
//   async createForManager(managerId: string, data:any) {
//   const manager = await this.userRepo.findOne({ where: { id: managerId } });

//   const restaurant = this.repo.create({
//     ...data,
//     manager: manager,   
//   });

//   return this.repo.save(restaurant);
// }

async createForManager(managerId: string, dto: CreateRestaurantDto) {
  const manager = await this.userRepo.findOne({ where: { id: managerId } });
  if (!manager) throw new NotFoundException('Manager not found');

  if (manager.role !== UserRole.MANAGER) {
    throw new ForbiddenException('Selected user is not a manager');
  }

  if (!manager.country) {
    throw new ForbiddenException('Manager has no country assigned');
  }

  if (dto.country !== manager.country) {
    throw new ForbiddenException(
      `Restaurant must be in the manager’s country (${manager.country})`
    );
  }

  const restaurant = this.repo.create({
    ...dto,
    manager: manager,
  });

  return this.repo.save(restaurant);
}


async updateManagerRestaurant(managerId: string, restId: string, data:any) {
  const restaurant = await this.repo.findOne({
    where: { id: restId },
    relations: ['manager'],
  });

  if (!restaurant) throw new NotFoundException('Restaurant not found');

  if (restaurant.manager.id !== managerId) {
    throw new ForbiddenException('You cannot edit someone else’s restaurant');
  }

  Object.assign(restaurant, data);
  return this.repo.save(restaurant);
}


  
}
