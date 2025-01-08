import OptionDirection from "@/components/button/option.direction"
import { APP_COLOR } from "@/theme/theme"
import { ImageBackground, Keyboard, StyleSheet, Text, ToastAndroid, View } from "react-native"
import OTPTextView from "react-native-otp-textinput"
import authBackground from 'assets/auth/background.png'
import LoadingOverlay from "@/components/loading/overlay"
import { useCallback, useEffect, useRef, useState } from "react"
import { resendAPI, verifyCodeAPI } from "@/utils/api"
import { router, useLocalSearchParams } from "expo-router"

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
  const [isSubmit, setIsSubmit] = useState(false)
  const [code, setCode] = useState<string>('')
  const [isDelayResend, setIsDelayResend] = useState<boolean>(false)
  const [timeLeft, setTimeLeft] = useState(180);


  // Get email from url
  const { email, isLogin } = useLocalSearchParams()

  const otpRef = useRef<OTPTextView>(null)


  // Handle verify code
  const verifyCode = useCallback(async() => {
    if (code && code.length === 6) {
      setIsSubmit(true)
      Keyboard.dismiss()

      const res = await verifyCodeAPI(email as string, code)

      if (res.data) {
        // alert('success')
        ToastAndroid.show('Tài khoản đã được kích hoạt!', ToastAndroid.SHORT)

        // Clear data input
        otpRef?.current?.clear()

        // Clear loading
        setIsSubmit(false)

        // Redirect to signin
        if (isLogin) {
          router.replace('/(tabs)')
        } else {
          router.replace('/(auth)/signin')
        }

      } else {
        ToastAndroid.show(res.message as string, ToastAndroid.SHORT)

        // Clear data input
        otpRef?.current?.clear()

        // Clear loading
        setIsSubmit(false)
      }
    }
  }, [code, email])


  // Handle resend verify code
  const handleResendCode = useCallback(async () => {
    setIsSubmit(true)
    // Clear data input
    otpRef?.current?.clear()

    if (email) {
      const res = await resendAPI(email as string)
      const mess = res.data ? 'Mã xác nhận đã được gửi lại. vui lòng kiểm tra email.' : ''
      // const mess = 'Mã xác nhận đã được gửi lại. vui lòng kiểm tra email.'
      ToastAndroid.show(mess as string, ToastAndroid.SHORT)
      setIsDelayResend(true)
      setTimeLeft(180);
    }

    // setTimeout(() => {setIsSubmit(false)}, 3000)
    setIsSubmit(false)
  }, [email])

  // Format time
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    verifyCode()
  }, [code])

  // Handle verify code resend time
  useEffect(() => {
    if (isDelayResend && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }

    if (timeLeft <= 0) {
      setIsDelayResend(false);
    }
  }, [isDelayResend, timeLeft]);



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
            ref={otpRef}
            handleTextChange={(setCode)}
            autoFocus
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

            {
              isDelayResend ? (
                <Text style={{ textAlign: 'center' }}>
                  Mã xác nhận đã được gửi lại. Gửi lại sau
                  {` ${formatTime(timeLeft)}`}
                </Text>
              ) : (
                <OptionDirection
                  onPress={() => handleResendCode()}
                  // url={'/(auth)/signup'}
                  textIntro="Không nhận được mã xác nhận?"
                  textDirection="Gửi lại"
                  styleContainer={{ marginVertical: 10 }}
                  styleTextIntro={{ color: 'black' }}
                  styleTextDirection={{ color: APP_COLOR.PRIMARY, fontWeight: '500' }}
                />
              )
            }

      </View>

      { isSubmit && <LoadingOverlay /> }
    </ImageBackground>
  )
}

export default VerifyPage