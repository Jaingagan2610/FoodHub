import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { MenuItem } from '../menu/menu-item.entity';
import { User } from '../users/user.entity';

@Entity('restaurants')
export class Restaurant {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  phone!: string;
  
  @Column()
  description!: string;

  @Column()
  location!: string;

  @Column()
  imageUrl!: string;

  @Column()
  cuisineType!: string;

  @Column()
  country!: string; // 'IN' | 'US'

  @OneToMany(() => MenuItem, (menuItem) => menuItem.restaurant, {
    cascade: true,
  })
  menuItems!: MenuItem[];

  @ManyToOne(() => User, (user) => user.restaurants, { onDelete: 'CASCADE' })
  manager!: User;
}
