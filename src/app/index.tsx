import { Text, View } from "react-native"
import { router } from "expo-router"
import { getAccountAPI } from "@/utils/api"
import { useEffect, useState } from "react"
import { useCurrentApp } from "@/context/app.context"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from "expo-font"

SplashScreen.preventAutoHideAsync();


const RootPage = () => {
  const { setAppState } = useCurrentApp()
  const [state, setState] = useState<any>()

  const [loaded, error] = useFonts({'SpaceMono-Regular': require('@/assets/fonts/SpaceMono-Regular.ttf')})

  useEffect(() => {
    async function prepare() {
      try {
        const res = await getAccountAPI()

        if (res.data) {
          setAppState({
            user: res.data.user,
            access_token: await AsyncStorage.getItem('access_token')
          })
          router.replace('/(tabs)')
        } else {
          router.replace('/(auth)/welcome')
        }
      } catch (e) {
        setState(() => { throw new Error('Không thể kết nối tới backend!') })
      } finally {
        // Tell the application to render
        await SplashScreen.hideAsync()
      }
    }

    prepare()
  }, [])



  return (
    <></>
  )
}

export default RootPage
