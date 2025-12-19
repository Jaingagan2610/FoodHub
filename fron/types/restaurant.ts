export interface MenuItem {
  id: string;
  name: string;
  price: number;
}

export interface Restaurant {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  cuisineType: string;
  country: string;
  menuItems: MenuItem[];
}
