import {
  View,
  Text,
  Keyboard,
  StyleSheet,
  ToastAndroid,
  ImageBackground,
} from "react-native"
import { Formik } from 'formik'
import { useState } from "react"
import { router } from "expo-router"
import { APP_COLOR } from "@/theme/theme"
import { registerAPI } from "@/utils/api"
import { SignupSchema } from "@/utils/validate.schema"
import OptionDirection from "@/components/button/option.direction"
import ShareButton from "@/components/button/share.button"
import SocialButton from "@/components/button/social.button"
import ShareInput from "@/components/input/share.input"
import LoadingOverlay from "@/components/loading/overlay"
import authBackground from 'assets/auth/background.png'

const styles = StyleSheet.create({
  container: {
    gap: 10,
    flex: 1,
    paddingTop: 80,
    marginHorizontal: 20,
  },

  inputGroup: {
    padding: 5,
    gap: 10
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: '500'
  },
  inputForm: {
    borderColor: 'green',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 5
  }
})

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSignup = async (fullname: string, email: string, password: string) => {
    setIsLoading(true)
    if (validation(fullname, email, password)) {
      try {
        Keyboard.dismiss()

        const res = await registerAPI(email, password, fullname)
        if (res.data) {
          router.replace({
            pathname: '/(auth)/verify',
            params: { email: email }
          })
        } else {
          const errorMessage = Array.isArray(res.message) ? res.message[0] : res.message
          ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
        }

      } catch (error) {
        console.log('🚀 ~ fetchAPI ~ error:', error)
      }
    } else {
      ToastAndroid.show('Thông tin không hợp lệ! Vui lòng kiểm tra lại.', ToastAndroid.SHORT);
    }

    setIsLoading(false)
  }

  const validation = (fullname: string, email: string, password: string): boolean => {
    // Regex kiểm tra email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Kiểm tra fullname không rỗng và không chỉ chứa khoảng trắng
    const isFullnameValid = fullname.trim().length > 0;

    // Kiểm tra email khớp với regex
    const isEmailValid = emailRegex.test(email);

    // Kiểm tra password không rỗng và độ dài tối thiểu
    const isPasswordValid = password.length >= 6;

    return isFullnameValid && isEmailValid && isPasswordValid;
  }

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={authBackground}
    >
      <Formik
        initialValues={{ fullname: '', email: '', password: '' }}
        onSubmit={values => handleSignup(values.fullname, values.email, values.password)}
        validationSchema={SignupSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={styles.container}>
            <View>
              <Text style={{
                fontSize: 32,
                fontWeight: '500',
                marginVertical: 30
              }}>
                Đăng ký tài khoản
              </Text>
            </View>

            <ShareInput
              title="Họ tên"
              onChangeText={handleChange('fullname')}
              onBlur={handleBlur('fullname')}
              value={values.fullname}
              error={errors.fullname}
            />

            <ShareInput
              title="Email"
              keyboardType="email-address"

              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              error={errors.email}
            />

            <ShareInput
              title="Mật khẩu"
              secureTextEntry={true}

              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              error={errors.password}
            />

            <View style={{ marginVertical: 10 }}></View>

            <ShareButton
              onPress={() => handleSubmit()}
              title="Đăng ký"
              pressStyle={{ alignSelf: 'stretch' }}
              textStyle={{
                textTransform: 'uppercase',
                fontWeight: 500,
                fontSize: 14,
                color: 'rgba(254, 254, 254, 1)'
              }}
              btnStyle={{
                paddingVertical: 14,
                marginHorizontal: 5,
                justifyContent: 'center',
                borderRadius: 50,
                borderWidth: 1,
                borderColor: '#FFFFFF',
                backgroundColor: APP_COLOR.PRIMARY,
              }}
            />

            <OptionDirection
              url={'/(auth)/signin'}
              textIntro="Đã có tài khoản?"
              textDirection="Đăng nhập"
              styleTextIntro={{ color: '#000000' }}
              styleContainer={{ marginVertical: 20 }}
              styleTextDirection={{ color: APP_COLOR.PRIMARY }}
            />

            <SocialButton title="Đăng nhập với" />
          </View>
        )}
      </Formik>

      { isLoading && <LoadingOverlay /> }
    </ImageBackground>
  )
}

export default SignupPage