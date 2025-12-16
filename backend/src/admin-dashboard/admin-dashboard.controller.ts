import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminDashboardService } from './admin-dashboard.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('admin/dashboard')
export class AdminDashboardController {
  constructor(private service: AdminDashboardService) {}

  @Get()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  getDashboard() {
    return this.service.getDashboardStats();
  }

  @Get('sales')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  getSalesStats() {
    return this.service.getSalesGraph();
  }
}
