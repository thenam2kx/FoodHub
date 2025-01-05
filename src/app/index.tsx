import { Image, ImageBackground, StyleSheet, Text, View } from "react-native"
import ShareButton from "components/button/share.button"
import { APP_COLOR } from "theme/theme"
import welcomeBackground from 'assets/auth/welcome-background.png'
import facebookIcon from 'assets/auth/facebook.png'
import googleIcon from 'assets/auth/google.png'
import { LinearGradient } from "expo-linear-gradient"
import TextBetweenLine from "@/components/button/text.between.line"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
  },

  welcomeText: {
    flex: 0.6,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111719'
  },
  brand: {
    fontSize: 42,
    fontWeight: '700',
    color: APP_COLOR.PRIMARY,
    marginVertical: 10
  },
  slogan: {
    fontSize: 20,
    fontWeight: '400',
    color: '#30384F'
  },

  welcomeBtn: {
    flex: .4,
    gap: 20
  },

  btnSocialMedia: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30
  }

})

const WelcomePage = () => {
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={welcomeBackground}
    >
      <LinearGradient
        style={{ flex: 1 }}
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        locations={[0.2, 0.8]}
      >
        <View style={styles.container}>
          <View style={styles.welcomeText}>
            <Text style={styles.title}>Chào mừng đến với</Text>
            <Text style={styles.brand}>FoodHub</Text>
            <Text style={styles.slogan}>Nền tảng giao đồ ăn trực tuyến hàng đầu Việt Nam.</Text>
          </View>

          <View style={styles.welcomeBtn}>
            <TextBetweenLine title="Đăng nhập với" />

            <View style= {{ gap: 24, marginTop: 16 }}>
              <View style={styles.btnSocialMedia}>
                <ShareButton
                  onPress={() => alert('Đăng nhập thành công với Facebook')}
                  title="Facebook "
                  textStyle={{ textTransform: 'uppercase', fontWeight: 500, fontSize: 14 }}
                  btnStyle={{ justifyContent: 'center', borderRadius: 30, backgroundColor: '#FFFFFF' }}
                  icons={ <Image source={facebookIcon} />}
                />
                <ShareButton
                  onPress={() => alert('Đăng nhập thành công với Google')}
                  title="Google"
                  textStyle={{ textTransform: 'uppercase', fontWeight: 500, fontSize: 14 }}
                  btnStyle={{ justifyContent: 'center', borderRadius: 30, backgroundColor: '#FFFFFF' }}
                  icons={ <Image source={googleIcon} />}
                />
              </View>

              <View>
                <ShareButton
                  onPress={() => alert('Đăng nhập thành công với Email')}
                  title="Đăng nhập với email"
                  pressStyle={{ alignSelf: 'stretch' }}
                  textStyle={{
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: 16,
                    color: 'rgba(254, 254, 254, 1)'
                  }}
                  btnStyle={{
                    marginHorizontal: 35,
                    justifyContent: 'center',
                    borderRadius: 50,
                    borderWidth: 1,
                    borderColor: '#FFFFFF',
                    backgroundColor: 'rgba(255, 255, 255, 0.21)',
                  }}
                />
              </View>

              <View style={{ flexDirection: 'row', gap: 6, justifyContent: 'center' }}>
                <Text style={{ textAlign: "center", color: '#FFFFFF' }}>Chưa có tài khoản?</Text>
                <Text style={{ textAlign: "center", color: '#FFFFFF', textDecorationLine: 'underline' }}>Đăng ký</Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  )
}

export default WelcomePage