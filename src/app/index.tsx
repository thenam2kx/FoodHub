import { Text, View } from "react-native"
import { router } from "expo-router"
import { getAccountAPI } from "@/utils/api"
import { useEffect } from "react"
import { useCurrentApp } from "@/context/app.context"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync();


const RootPage = () => {
  const { setAppState } = useCurrentApp()

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
        console.warn(e)
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