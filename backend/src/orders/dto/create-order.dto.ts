export class CreateOrderDto {
  menuItems: {
    menuItemId: string;
    quantity: number;
  }[];
}