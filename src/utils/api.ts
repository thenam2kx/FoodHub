import axios from "@/utils/axios.customize";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const registerAPI = async (
  email: string,
  password: string,
  fullname: string
) => {
  const url = "/api/v1/auth/register";
  return await axios.post<IBackendRes<IRegister>>(url, {
    email: email,
    password: password,
    name: fullname,
  });
};

export const verifyCodeAPI = async (email: string, code: string) => {
  const url = "/api/v1/auth/verify-code";
  return await axios.post<IBackendRes<IRegister>>(url, { email, code });
};

export const resendAPI = async (email: string) => {
  const url = "/api/v1/auth/verify-email";
  return await axios.post<IBackendRes<IRegister>>(url, { email });
};

export const signinAPI = async (username: string, password: string) => {
  const url = "/api/v1/auth/login";
  return await axios.post<IBackendRes<IUserSignin>>(url, {
    username,
    password,
  });
};

export const getAccountAPI = async () => {
  const url = "/api/v1/auth/account";
  return await axios.get<IBackendRes<IUserSignin>>(url);
};

export const updateUserAPI = async (_id: string, name: string, phone: string) => {
  const url = "/api/v1/users";
  return await axios.patch<IBackendRes<IUserSignin>>(url, { _id, name, phone });
};

export const updateUserPasswordAPI = ( currentPassword: string, newPassword: string, ) => {
  const url = `/api/v1/users/password`;
  return axios.post<IBackendRes<IUserSignin>>(url, { currentPassword, newPassword });
}

export const requireForgotPasswordAPI = (email: string) => {
  const url = `/api/v1/auth/retry-password`;
  return axios.post<IBackendRes<IOrderHistory[]>>(url, { email });
}

export const changePasswordAPI = (data: any) => {
  const url = `/api/v1/auth/forgot-password`;
  return axios.post<IBackendRes<IOrderHistory[]>>(url, { ...data });
}

export const getTopRestaurantAPI = async (ref: string) => {
  const url = `/api/v1/restaurants/${ref}`;
  return await axios.post<IBackendRes<ITopRestaurant[]>>(url);
};

export const printAsyncStorage = () => {
  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys!, (error, stores) => {
      let asyncStorage: any = {};
      stores?.map((result, i, store) => {
        asyncStorage[store[i][0]] = store[i][1];
      });
      console.log(JSON.stringify(asyncStorage, null, 2));
    });
  });
};

export const getRestaurantByIdAPI = async (id: string) => {
  const url = `/api/v1/restaurants/${id}`;
  return await axios.get<IBackendRes<IRestaurant>>(url);
};

export const placeOrderAPI = (data: any) => {
  const url = `/api/v1/orders`;
  return axios.post<IBackendRes<IUserSignin>>(url, { ...data });
}

export const getOrderHistoryAPI = () => {
  const url = `/api/v1/orders`;
  return axios.get<IBackendRes<IOrderHistory[]>>(url);
}


export const likeRestaurantAPI = (restaurant: string, quantity: number) => {
  const url = `/api/v1/likes`;
  return axios.post<IBackendRes<IUserSignin>>(url, { restaurant, quantity });
}

export const getFavoriteRestaurantAPI = () => {
  const url = `/api/v1/likes?current=1&pageSize=10`;
  return axios.get<IBackendRes<IRestaurant[]>>(url);
}

export const getRestaurantByNameAPI = (name: string) => {
  const url = `/api/v1/restaurants?current=1&pageSize=10&name=/${name}/i`;
  return axios.get<IBackendRes<IModelPaginate<IRestaurant>>>(url);
}

export const filterRestaurantAPI = (query: string) => {
  const url = `/api/v1/restaurants?${query}`;
  return axios.get<IBackendRes<IModelPaginate<IRestaurant>>>(url);
}
