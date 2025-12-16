import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from '../restaurant/restaurant.entity'
import { MenuItem } from './menu-item.entity';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

@Module({
//   imports: [TypeOrmModule.forFeature([MenuItem,Restaurant])],
imports: [
  TypeOrmModule.forFeature([MenuItem, Restaurant])
],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
