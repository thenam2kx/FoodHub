import { Tabs } from "expo-router"
import React from "react"
import { Platform } from "react-native"
import { HapticTab } from "@/components/HapticTab"
import TabBarBackground from "@/components/ui/TabBarBackground"
import { APP_COLOR } from "@/theme/theme"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import AntDesign from "@expo/vector-icons/AntDesign"
import Octicons from "@expo/vector-icons/Octicons"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"

export default function TabLayout() {
  const getIcons = (routeName: string, focused: boolean, size: number) => {
    if (routeName === "index") {
      return (
        <MaterialCommunityIcons
          name="food-fork-drink"
          size={size}
          color={focused ? APP_COLOR.PRIMARY : APP_COLOR.GREY}
        />
      );
    }

    if (routeName === "order") {
      return (
        <MaterialIcons
          name="list-alt"
          size={size}
          color={focused ? APP_COLOR.PRIMARY : APP_COLOR.GREY}
        />
      );
    }

    if (routeName === "favorite") {
      return focused ? (
        <AntDesign name="heart" size={size} color={APP_COLOR.PRIMARY} />
      ) : (
        <AntDesign name="hearto" size={size} color={APP_COLOR.GREY} />
      );
    }

    if (routeName === "notification") {
      return focused ? (
        <Octicons name="bell-fill" size={size} color={APP_COLOR.PRIMARY} />
      ) : (
        <Octicons name="bell" size={size} color={APP_COLOR.GREY} />
      );
    }

    if (routeName === "account") {
      return focused ? (
        <MaterialCommunityIcons
          name="account"
          size={size}
          color={APP_COLOR.PRIMARY}
        />
      ) : (
        <MaterialCommunityIcons
          name="account-outline"
          size={size}
          color={APP_COLOR.GREY}
        />
      );
    }

    return <></>;
  };

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return getIcons(route.name, focused, size);
        },
        headerShown: false,
        tabBarLabelStyle: { paddingBottom: 3 },
        tabBarActiveTintColor: APP_COLOR.PRIMARY,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { position: "absolute" },
          default: {},
        }),
      })}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Home" }}
      />
      <Tabs.Screen
        name="order"
        options={{ title: "Đơn hàng" }}
      />
      <Tabs.Screen
        name="favorite"
        options={{ title: "Đã thích" }}
      />
      <Tabs.Screen
        name="notification"
        options={{ title: "Thông báo" }}
      />

      <Tabs.Screen
        name="account"
        options={{ title: "Tôi" }}
      />
    </Tabs>
  );
}
