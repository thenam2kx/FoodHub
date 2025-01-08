import * as Yup from 'yup';

export const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email('Định dạng email không hợp lệ!')
    .required('Email không được để trống!'),

  password: Yup.string()
    .min(6, 'Mật khẩu không được ít hơn 5 ký tự!')
    .max(50, 'Mật khẩu không được dài hơn 50 ký tự!')
    .required('Mật khẩu không được để trống!'),
})

export const SignupSchema = Yup.object().shape({
  fullname: Yup.string()
    .required('Họ tên không được để trống!'),

  email: Yup.string()
    .email('Định dạng email không hợp lệ!')
    .required('Email không được để trống!'),

  password: Yup.string()
    .min(6, 'Mật khẩu không được ít hơn 5 ký tự!')
    .max(50, 'Mật khẩu không được dài hơn 50 ký tự!')
    .required('Mật khẩu không được để trống!'),
})