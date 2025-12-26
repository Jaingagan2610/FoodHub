export class CreateRestaurantDto {
  managerId: string;
  name: string;
  phone: string;
  description:string;
  location: string;
  imageUrl: string;
  cuisineType: string;
  country: string; // 'IN' | 'US'
}
