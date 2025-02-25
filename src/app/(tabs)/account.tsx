import { useCurrentApp } from "@/context/app.context";
import { getBaseUrlBackend } from "@/utils/helper";
import { APP_COLOR } from "@/theme/theme";
import { View, Text, Image, Pressable, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AccountPage = () => {
  const { appState } = useCurrentApp();
  const baseImage = `${getBaseUrlBackend()}/images/avatar`;
  const insets = useSafeAreaInsets();

  const handleLogout = async () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất ?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Đồng ý",
        onPress: async () => {
          await AsyncStorage.removeItem("access_token");
          router.replace("/(auth)/signin");
        },
      },
    ]);
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          // paddingTop: insets.top,
          paddingTop: 20,
          paddingHorizontal: 10,
          paddingBottom: 20,
          backgroundColor: APP_COLOR.PRIMARY,
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
        }}
      >
        <Image
          style={{ height: 60, width: 60 }}
          source={{ uri: `${baseImage}/${appState?.user.avatar}` }}
        />
        <View>
          <Text style={{ color: "white", fontSize: 20 }}>
            {appState?.user.name}
          </Text>
        </View>
      </View>

      <Pressable
        onPress={() => router.navigate('/(user)/account/user.info')}
        style={{
          paddingVertical: 15,
          paddingHorizontal: 10,
          borderBottomColor: "#eee",
          borderBottomWidth: 1,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Feather name="user-check" size={20} color="green" />
          <Text>Cập nhật thông tin</Text>
        </View>

        <MaterialIcons name="navigate-next" size={24} color="grey" />
      </Pressable>

      <Pressable
        onPress={() => router.push('/(auth)/forgot-password')}
        style={{
          paddingVertical: 15,
          paddingHorizontal: 10,
          borderBottomColor: "#eee",
          borderBottomWidth: 1,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <MaterialIcons name="password" size={20} color="green" />
          <Text>Thay đổi mật khẩu</Text>
        </View>

        <MaterialIcons name="navigate-next" size={24} color="grey" />
      </Pressable>

      <Pressable
        style={{
          paddingVertical: 15,
          paddingHorizontal: 10,
          borderBottomColor: "#eee",
          borderBottomWidth: 1,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <MaterialIcons name="language" size={20} color="green" />
          <Text>Ngôn ngữ</Text>
        </View>

        <MaterialIcons name="navigate-next" size={24} color="grey" />
      </Pressable>

      <Pressable
        style={{
          paddingVertical: 15,
          paddingHorizontal: 10,
          borderBottomColor: "#eee",
          borderBottomWidth: 1,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <MaterialIcons name="info-outline" size={20} color="green" />
          <Text>Về ứng dụng</Text>
        </View>

        <MaterialIcons name="navigate-next" size={24} color="grey" />
      </Pressable>

      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          gap: 10,
          paddingBottom: 15,
        }}
      >
        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => ({
            opacity: pressed === true ? 0.5 : 1,
            padding: 10,
            marginHorizontal: 10,
            backgroundColor: APP_COLOR.PRIMARY,
            borderRadius: 3,
          })}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
            }}
          >
            Đăng Xuất
          </Text>
        </Pressable>
        <Text style={{ textAlign: "center", color: APP_COLOR.GREY }}>
          Version 1.0 - @devfulls
        </Text>
      </View>
    </View>
  );
};

export default AccountPage;
