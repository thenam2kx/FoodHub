import axios from '@/utils/axios.customize'

export const registerAPI = async (email: string, password: string, fullname: string) => {
  const url = `/api/v1/auth/register`
  return await axios.post<IBackendRes<IRegister>>(url, {
    email: email,
    password: password,
    name: fullname
  })
}