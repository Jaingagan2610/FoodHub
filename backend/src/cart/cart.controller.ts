import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
  Req,
  Patch,
  Put,
} from "@nestjs/common";
import { CartService } from "./cart.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateCartItemDto } from "./dto/create-cart-item.dto";

@Controller("cart")
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private service: CartService) {}

  @Post()
  addItem(@Req() req: any, @Body() dto: CreateCartItemDto) {
    return this.service.addItem(req.user.id, dto);
  }

  @Get()
  getCart(@Req() req: any) {
    return this.service.getUserCart(req.user.id);
  }

   @Put(":id")
  @UseGuards(JwtAuthGuard)
  updateItem(
    @Req() req: any,
    @Param("id") id: string,
    @Body() dto: CreateCartItemDto
  ) {
    return this.service.updateItem(id, req.user.id, dto);
  }

  @Delete(":id")
  removeItem(@Req() req: any, @Param("id") id: string) {
    return this.service.removeItem(id, req.user.id);
  }

  @Delete()
  clearCart(@Req() req: any) {
    return this.service.clearCart(req.user.id);
  }
}
