export type Product = {
  id: number;
  name: string;
  slug: string;
  condition: number;
  sold_by: string;
  size: number;
  gender: number;
  brand: number;
  category: number;
  user_type: string;
  prize: number;
  date_added: Date;
  product_img: string;
};
  
export type ProductList = {
  results: Product[];
};
  
export type ProductFilterParams = {
  name: string | undefined;
  condition: string | undefined;
  sold_by: string | undefined;
  size: string | undefined;
  gender: string | undefined;
  brand: string | undefined;
  category: string | undefined;
  prize_min: string | undefined;
  prize_max: string | undefined;
  user_type: string | undefined;
};




