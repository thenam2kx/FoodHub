import OptionDirection from "@/components/button/option.direction"
import ShareButton from "@/components/button/share.button"
import SocialButton from "@/components/button/social.button"
import ShareInput from "@/components/input/share.input"
import { APP_COLOR } from "@/theme/theme"
import { Link } from "expo-router"
import { useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
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
  const [fullname, setFullname] = useState<string>('vdvd')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSignup = () => {
    console.log(fullname, email, password)
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