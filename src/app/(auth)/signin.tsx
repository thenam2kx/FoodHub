import { useState } from "react"
import {
  ImageBackground,
  StyleSheet,
  Text,
  ToastAndroid,
  View
} from "react-native"
import { Formik } from 'formik'
import { router } from "expo-router"
import { signinAPI } from "@/utils/api"
import { APP_COLOR } from "@/theme/theme"
import { SigninSchema } from "@/utils/validate.schema"
import ShareInput from "@/components/input/share.input"
import authBackground from 'assets/auth/background.png'
import ShareButton from "@/components/button/share.button"
import SocialButton from "@/components/button/social.button"
import OptionDirection from "@/components/button/option.direction"
import { useCurrentApp } from "@/context/app.context"
import AsyncStorage from "@react-native-async-storage/async-storage"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    paddingTop: 80
  },

  heading: {
    fontSize: 32,
    fontWeight: '500',
    marginVertical: 30,
  },

  groupInput: {
    gap: 10
  }
})

const SigninPage = () => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const { setAppState } = useCurrentApp()

  const handleSignin = async (email: string, password: string) => {
    setLoading(true)
    try {
      const res = await signinAPI(email, password)
      if (res.data) {
        await AsyncStorage.setItem('access_token', res.data.access_token)
        setAppState(res.data)
        router.replace('/(tabs)')
      } else {
        const errorMessage = Array.isArray(res.message) ? res.message[0] : res.message
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);

        if (res?.statusCode === 400) {
          router.replace({
            pathname: '/(auth)/verify',
            params: { email: email, isLogin: 1 }
          })
        }
      }
    } catch (error) {
      console.log('🚀 ~ handleSignin ~ error:', error)
    } finally {
      setLoading(false)
    }
  }


  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={authBackground}
    >
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={values => handleSignin(values.email, values.password)}
        validationSchema={SigninSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={styles.container}>
            <View>
              <Text style={styles.heading}>
                Đăng nhập
              </Text>
            </View>

            <View style={styles.groupInput}>
              <ShareInput
                title="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                error={errors.email}
                keyboardType="email-address"
              />

            <ShareInput
              title="Mật khẩu"
              secureTextEntry={true}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              error={errors.password}
            />
            </View>

            <OptionDirection
              url={'/(auth)/signin'}
              textDirection="Quên mật khẩu?"
              styleTextIntro={{ color: '#000000' }}
              styleContainer={{ marginVertical: 32 }}
              styleTextDirection={{
                color: APP_COLOR.PRIMARY,
                fontWeight: '500',
                textDecorationLine: 'none'
              }}
            />

            <ShareButton
              onPress={handleSubmit}
              isLoading={isLoading}
              title="Đăng nhập"
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
              textIntro="Chưa có tài khoản?"
              textDirection="Đăng ký."
              styleTextIntro={{ color: '#000000' }}
              styleContainer={{ marginTop: 32, marginBottom: 56 }}
              styleTextDirection={{ color: APP_COLOR.PRIMARY, fontWeight: '500' }}
            />

            <SocialButton title="Đăng ký với" />
          </View>
        )}
      </Formik>

    </ImageBackground>
  )
}

export default SigninPage