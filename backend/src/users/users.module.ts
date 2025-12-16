import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])   // <-- register entity here
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]  // <-- required so AuthModule can use UsersService
})
export class UsersModule {}
