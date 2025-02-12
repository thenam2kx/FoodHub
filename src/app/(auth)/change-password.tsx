import ShareButton from '@/components/button/share.button'
import ShareInput from '@/components/input/share.input'
import { APP_COLOR } from '@/theme/theme'
import { changePasswordAPI } from '@/utils/api'
import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { ToastAndroid, View } from 'react-native'

const ChangePasswordPage = () => {
  const [password, setPassword] = useState<string>('')
  const [verifyCode, setVerifyCode] = useState<string>('')
  const { email } = useLocalSearchParams();

  const handleChangePassword = async () => {
    if (email) {
      const data = {
        email,
        password,
        code: verifyCode
      }
      const res = await changePasswordAPI(data)
      if (res && res.data) {
        ToastAndroid.show(
          'Mật khẩu của bạn đã được thay đổi thành công',
          ToastAndroid.SHORT
        );
        router.push({ pathname: '/account' });
      } else {
        ToastAndroid.show(res?.message as string, ToastAndroid.SHORT);
      }
    }
  }

  return (
    <View style={{ flex: 1, marginHorizontal: 20, marginVertical: 20 }}>
      <ShareInput
        title="Nhập mã xác nhận"
        onChangeText={(v: string) => setVerifyCode(v)}
        onBlur={() => {}}
        placeholder="123456"
        value={verifyCode}
      />
      <ShareInput
        title="Mật khẩu mới"
        onChangeText={(v: string) => setPassword(v)}
        onBlur={() => {}}
        secureTextEntry={true}
        placeholder="*******"
        value={password}
      />
      <ShareButton
        onPress={() => handleChangePassword()}
        title="Đổi mật khẩu"
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

export default ChangePasswordPage
