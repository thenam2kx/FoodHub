export {};

declare global {
  interface IBackendRes<T> {
    error?: string | string[];
    message: string | string[];
    statusCode: number | string;
    data?: T;
  }

  interface IRegister {
    _id: string;
  }

  interface IUserSignin {
    user: {
      email: string;
      _id: string;
      name: string;
      role: string;
      address: string;
      avatar: string;
      phone: string;
    };
    access_token: string;
  }

  interface ITopRestaurant {
    _id: string;
    name: string;
    phone: string;
    address: string;
    email: string;
    rating: number;
    image: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: 0;
  }

  interface IRestaurant {
    _id: string;
    name: string;
    phone: string;
    address: string;
    email: string;
    rating: number;
    image: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: 0;
    menu: IMenu[];
  }

  interface IMenu {
    _id: string;
    restaurant: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    menuItem: IMenuItem[];
  }

  interface IMenuItem {
    _id: string;
    menu: string;
    title: string;
    description: string;
    basePrice: number;
    image: string;
    options: {
      title: string;
      description: string;
      additionalPrice: number;
    }[];
    createdAt: Date;
    updatedAt: Date;
  }

  interface ICart {
    [key: string]: {
      sum: number;
      quantity: number;
      items: {
        [key: string]: {
          quantity: number;
          data: IMenuItem;
        };
      };
    };
  }
}
