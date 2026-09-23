export type Product = {
  name: string;
  price: number;
  image: string;
  amountInStock: number;
};

export type ProductSend = {
  name: string;
  price: number;
  image: string;
};


export type Cart = {
  userId: string
  products: Product[]
}



export type CartItem = {
  cartItemId: string;
  productId: string;
  amount: number;
};