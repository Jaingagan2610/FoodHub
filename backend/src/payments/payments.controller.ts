import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreatePaymentDto } from './dto/create-payment.dto';


@Controller('payments')
export class PaymentsController {
  constructor(private service: PaymentsService) {}


  // @Post('create-order')
  // async createOrder(@Body() body: { amount: number }) {
  //   const order = await this.service.createOrder(body.amount);
  //   return order;
  // }
  @Post("create-order")
@UseGuards(JwtAuthGuard)
async createOrder(@Body() body: any) {
  return this.service.createRazorpayOrder(body.amount);
}

  @Post()
@UseGuards(JwtAuthGuard)
create(@Req() req: any, @Body() dto: CreatePaymentDto) {
  return this.service.payForOrder(req.user.id, dto);
}

  // USER: Get my payments
  @Get('my')
  @UseGuards(JwtAuthGuard)
  myPayments(@Req() req:any) {
    return this.service.findMyPayments(req.user.id);
  }

  // ADMIN: Get all payments
  @Get()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  getAll() {
    return this.service.findAll();
  }
}
