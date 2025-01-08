import axios from '@/utils/axios.customize'

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
