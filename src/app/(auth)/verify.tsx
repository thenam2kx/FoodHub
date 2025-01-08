import OptionDirection from "@/components/button/option.direction"
import { APP_COLOR } from "@/theme/theme"
import { ImageBackground, StyleSheet, Text, View } from "react-native"
import OTPTextView from "react-native-otp-textinput"
import authBackground from 'assets/auth/background.png'

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 20,
  },

  heading: {
    fontSize: 32,
    fontWeight: "600",
    marginVertical: 20
  },

  description: {
    fontSize: 16,
    fontWeight: "400",
    marginVertical: 10
  }
})

const VerifyPage = () => {
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={authBackground}
    >
      <View style={styles.container}>
        <View>
          <Text style={styles.heading}>Xác thực tài khoản</Text>
          <Text style={styles.description}>Vui lòng nhập mã xác thực đã được gửi tới tài khoản email thenam2kx@gmail.com</Text>
        </View>
        <View style={{ marginVertical: 20 }}>
          <OTPTextView
            inputCount={6}
            inputCellLength={1}
            tintColor={APP_COLOR.PRIMARY}
            textInputStyle={{
              borderWidth: 1,
              borderBottomWidth: 1,
              borderRadius: 5,
              // @ts-ignore:next-line
              color: APP_COLOR.PRIMARY
            }}
          />
        </View>

        <OptionDirection
          url={'/(auth)/signup'}
          textIntro="Không nhận được mã xác nhận?"
          textDirection="Gửi lại"
          styleContainer={{ marginVertical: 10 }}
          styleTextIntro={{ color: 'black' }}
          styleTextDirection={{ color: APP_COLOR.PRIMARY, fontWeight: '500' }}
        />
      </View>
    </ImageBackground>
  )
}

export default VerifyPage