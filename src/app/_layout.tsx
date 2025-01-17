import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { ErrorBoundaryProps, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppProvider from "@/context/app.context";
import { Button, View } from "react-native";
import { Text } from "react-native";
import { APP_COLOR } from "@/theme/theme";

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 10, gap: 15 }}>
        <View
          style={{
            backgroundColor: "#333",
            padding: 10,
            borderRadius: 3,
            gap: 10,
          }}
        >
          <Text style={{ color: "red", fontSize: 20 }}>
            Something went wrong
          </Text>
          <Text style={{ color: "#fff" }}>{error.message}</Text>
        </View>
        <Button title="Try Again ?" onPress={retry} />
      </View>
    </SafeAreaView>
  );
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
    },
  };

  return (
    <GestureHandlerRootView>
      <RootSiblingParent>
        <AppProvider>
          <ThemeProvider
            value={navTheme}
            // value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
          >
            <SafeAreaView style={{ flex: 1 }}>
              <Stack screenOptions={{
                headerTintColor: APP_COLOR.PRIMARY,
                headerTitleStyle: { color: 'black' }
              }}>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen
                  name="(auth)/signup"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(auth)/verify"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(auth)/signin"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(auth)/welcome"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="product/[id]"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="product/create.modal"
                  options={{
                    headerShown: false,
                    animation: 'fade',
                    presentation: 'transparentModal',
                  }}
                />
                <Stack.Screen
                  name="product/update.modal"
                  options={{
                    headerShown: false,
                    animation: 'fade',
                    presentation: 'transparentModal',
                  }}
                />
                <Stack.Screen
                  name="product/order"
                  options={{ headerTitle: 'Xác nhận đơn hàng' }}
                />
                <Stack.Screen name="+not-found" />
              </Stack>
            </SafeAreaView>
            {/* <StatusBar style="auto" /> */}
          </ThemeProvider>
        </AppProvider>
      </RootSiblingParent>
    </GestureHandlerRootView>
  );
}
