import { Image, StyleSheet, View } from "react-native"
import ShareButton from "./share.button"
import facebookIcon from 'assets/auth/facebook.png'
import googleIcon from 'assets/auth/google.png'
import TextBetweenLine from "./text.between.line"

const styles = StyleSheet.create({

})

interface IProps {
  title: string
}

const SocialButton = (props: IProps) => {
  const { title = '' } = props

  return (
    <View style={{ gap: 10 }}>
      <TextBetweenLine
        title={title}
        lineColor="rgba(179, 179, 179, 0.5)"
        textColor="rgba(91, 91, 94, 1)"
      />
      <View style= {{ gap: 24, marginTop: 16 }}>
        <View style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 30
        }}>
          <ShareButton
            onPress={() => alert('Đăng nhập thành công với Facebook')}
            title="Facebook "
            textStyle={{ textTransform: 'uppercase', fontWeight: 500, fontSize: 14 }}
            btnStyle={{
              justifyContent: 'center',
              borderRadius: 30,
              backgroundColor: '#FFFFFF',
              filter: 'drop-shadow(19px 19px 37px #D3D1D8)'
            }}
            icons={ <Image source={facebookIcon} />}
          />
          <ShareButton
            onPress={() => alert('Đăng nhập thành công với Google')}
            title="Google"
            textStyle={{ textTransform: 'uppercase', fontWeight: 500, fontSize: 14 }}
            btnStyle={{
              justifyContent: 'center',
              borderRadius: 30,
              backgroundColor: '#FFFFFF',
              filter: 'drop-shadow(19px 19px 37px #D3D1D8)'
            }}
            icons={ <Image source={googleIcon} />}
          />
        </View>
      </View>
    </View>
  )
}

export default SocialButton