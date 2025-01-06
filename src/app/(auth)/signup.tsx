import OptionDirection from "@/components/button/option.direction"
import ShareButton from "@/components/button/share.button"
import SocialButton from "@/components/button/social.button"
import ShareInput from "@/components/input/share.input"
import { APP_COLOR } from "@/theme/theme"
import axios from "axios"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const styles = StyleSheet.create({
  container: {
    gap: 10,
    flex: 1,
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
  const [fullname, setFullname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSignup = async () => {
    const url = `${process.env.EXPO_PUBLIC_API_URL}/api/v1/auth/register`
    try {
      const res = await axios.post(url, {
        email: email,
        password: password,
        name: fullname
      })

      if (res.data) {
        router.navigate('/(auth)/verify')
      }

    } catch (error) {
      console.log('🚀 ~ fetchAPI ~ error:', error)
    }
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <Text style={{
            fontSize: 24,
            fontWeight: '500',
            marginVertical: 30
          }}>
            Đăng ký tài khoản
          </Text>
        </View>

        <ShareInput
          title="Họ tên"
          value={fullname}
          setValue={setFullname}
        />

        <ShareInput
          title="Email"
          value={email}
          setValue={setEmail}
          keyboardType="email-address"
        />

        <ShareInput
          title="Mật khẩu"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />

        <View style={{ marginVertical: 10 }}></View>

        <ShareButton
          onPress={() => handleSignup()}
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
          url={'/(auth)/signup'}
          textIntro="Đã có tài khoản?"
          textDirection="Đăng nhập"
          styleTextIntro={{ color: '#000000' }}
          styleContainer={{ marginVertical: 20 }}
          styleTextDirection={{ color: APP_COLOR.PRIMARY }}
        />

        <SocialButton />

      </View>
    </SafeAreaView>
  )
}

export default SignupPage