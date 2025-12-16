import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from '../restaurant/restaurant.entity'
import { CartItem } from './cart.entity';
import { User } from '../users/user.entity';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { MenuItem } from '../menu/menu-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartItem, MenuItem, User]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
