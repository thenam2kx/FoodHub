import { useCurrentApp } from '@/context/app.context'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import profileBackground from '@/assets/Profile.png'
import ShareInput from '@/components/input/share.input'

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginTop: 120
  },
  avatar: {
    height: 108,
    width: 108,
  },
  avatarName: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 4
  },
  avatarEdit: {
    textAlign: 'center',
    color: 'grey',
    fontSize: 12,
    textDecorationLine: 'underline'
  },

  formGroup: {
    marginTop: 40,
    gap: 12,
    paddingHorizontal: 18
  }
})

const AccountPage = () => {
  const { appState } = useCurrentApp()
  const url_backend = `${process.env.EXPO_PUBLIC_API_URL}/images/avatar`

  return (
  <ImageBackground
    style={{ flex: 1 }}
    source={profileBackground}
  >
    <View style={styles.header}>
      <Image
        style={styles.avatar}
        source={{ uri: `${url_backend}/${appState?.user.avatar}` }}
      />
      <Text style={styles.avatarName}>{appState?.user.name}</Text>
      <Text style={styles.avatarEdit}>Sửa thông tin</Text>
    </View>

    <View style={styles.formGroup}>
      <ShareInput title='Họ tên' value={appState?.user.name}/>
      <ShareInput title='Email' value={appState?.user.email}/>
      <ShareInput title='Số điện thoại' value={appState?.user.phone}/>
    </View>
  </ImageBackground>
  )
}

export default AccountPage