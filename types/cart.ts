type CartItem = {
  id: string;
  title: string;
  price: string;
  image: string;
  quantity: number;
  properties?: {
    [key: string]: string;
  };
};
