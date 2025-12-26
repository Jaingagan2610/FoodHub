import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async findAll() {
  return this.repo.find({
    select: ["id", "name", "email", "role", "country", "createdAt"],
  });
}

  async register(data: any) {
    const exist = await this.repo.findOne({ where: { email: data.email } });

    if (exist) throw new BadRequestException('Email already exists');

    const hashed = await bcrypt.hash(data.password, 10);

    const user = this.repo.create({ ...data, password: hashed });
    return this.repo.save(user);
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  // async getProfile(userId: string) {
  // return await this.repo.findOne({
  //   where: { id: userId },
  //   select: ["id", "name", "email", "role", "country", "createdAt"] // NO PASSWORD
  // });
  async getProfile(userId: string) {
  const user = await this.repo.findOne({
    where: { id: userId },
    select: [
      "id",
      "name",
      "email",
      "role",
      "country",
      "createdAt",
    ],
  });

  if (!user) {
    throw new NotFoundException("User not found");
  }

  return user;
}

}


