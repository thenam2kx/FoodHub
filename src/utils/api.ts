import axios from '@/utils/axios.customize'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const registerAPI = async (email: string, password: string, fullname: string) => {
  const url = '/api/v1/auth/register'
  return await axios.post<IBackendRes<IRegister>>(url, {
    email: email,
    password: password,
    name: fullname
  })
}

export const verifyCodeAPI = async (email: string, code: string) => {
  const url = '/api/v1/auth/verify-code'
  return await axios.post<IBackendRes<IRegister>>(url, { email, code })
}

export const resendAPI = async (email: string) => {
  const url = '/api/v1/auth/verify-email'
  return await axios.post<IBackendRes<IRegister>>(url, { email })
}

export const signinAPI = async (username: string, password: string) => {
  const url = '/api/v1/auth/login'
  return await axios.post<IBackendRes<IUserSignin>>(url, { username, password })
}

export const getAccountAPI = async () => {
  const url = '/api/v1/auth/account'
  return await axios.get<IBackendRes<IUserSignin>>(url)
}


export const printAsyncStorage = () => {
  AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys!, (error, stores) => {
          let asyncStorage: any = {}
          stores?.map((result, i, store) => {
              asyncStorage[store[i][0]] = store[i][1]
          });
          console.log(JSON.stringify(asyncStorage, null, 2));
      });
  });
};
