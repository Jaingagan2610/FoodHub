import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RestaurantsModule } from './restaurant/restaurants.module';
import { MenuModule } from './menu/menu.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { CartItem } from './cart/cart.entity';
import { CartModule } from './cart/cart.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',           // or 'postgres'
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'testing_nest',
      autoLoadEntities: true,
      synchronize: true,
    }),
    MenuModule,
    PaymentsModule,
    OrdersModule,
    RestaurantsModule,
    UsersModule,
    AdminDashboardModule,
    AuthModule,
    CartModule  
  ],
})
export class AppModule {}
