import ShareButton from "@/components/button/share.button"
import ShareInput from "@/components/input/share.input"
import { APP_COLOR } from "@/theme/theme"
import { requireForgotPasswordAPI } from "@/utils/api"
import { router } from "expo-router"
import { useState } from "react"
import { Text, ToastAndroid, View } from "react-native"


const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string>('')

  const handleRequireForgotPassword = async () => {
    const res = await requireForgotPasswordAPI(email)
    if (res && res.data) {
      ToastAndroid.show(
        'Mã khôi phục mật khẩu đã được gửi tới email của bạn. Vui lòng kiểm tra',
        ToastAndroid.SHORT
      );
      router.push({ pathname: '/(auth)/change-password', params: { email } });
    } else {
      ToastAndroid.show(res?.message as string, ToastAndroid.SHORT);
    }
  }

  return (
    <View style={{ flex: 1, marginHorizontal: 20, marginVertical: 20 }}>
      <ShareInput
        title="Nhập email của bạn"
        onChangeText={(v: string) => setEmail(v)}
        onBlur={() => {}}
        placeholder="example@gmail.com"
        value={email}
        keyboardType="email-address"
      />
      <ShareButton
        onPress={handleRequireForgotPassword}
        title="Gửi yêu cầu"
        pressStyle={{ alignSelf: 'stretch' }}
        textStyle={{
          textTransform: 'uppercase',
          fontWeight: 500,
          fontSize: 14,
          color: 'rgba(254, 254, 254, 1)'
        }}
        btnStyle={{
          paddingVertical: 14,
          marginVertical: 10,
          justifyContent: 'center',
          borderRadius: 50,
          borderWidth: 1,
          borderColor: '#FFFFFF',
          backgroundColor: APP_COLOR.PRIMARY,
        }}
      />
    </View>
  )
}

export default ForgotPasswordPage
