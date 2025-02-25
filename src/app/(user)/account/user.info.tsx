import { useCurrentApp } from "@/context/app.context";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import ShareInput from "@/components/input/share.input";
import ShareButton from "@/components/button/share.button";
import { APP_COLOR } from "@/theme/theme";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { UpdateUserSchema } from "@/utils/validate.schema";
import { updateUserAPI } from "@/utils/api";
import Toast from "react-native-root-toast";

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginTop: 120,
  },
  avatar: {
    height: 108,
    width: 108,
  },
  avatarName: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 4,
  },
  avatarEdit: {
    textAlign: "center",
    color: "grey",
    fontSize: 12,
    textDecorationLine: "underline",
  },

  formGroup: {
    marginTop: 40,
    gap: 12,
    paddingHorizontal: 18,
  },
});

const UserInfoPage = () => {
  const { appState, setAppState } = useCurrentApp();
  const router = useRouter();
  const url_backend = `${process.env.EXPO_PUBLIC_API_URL}/images/avatar`;
  console.log('🚀 ~ handleUpdate ~ appState:', appState)

  const handleUpdate = async (name: string, phone: string) => {
    if (appState?.user._id) {
      const res = await updateUserAPI(appState?.user._id, name, phone);
      console.log('🚀 ~ handleUpdate ~ res:', res)
      if (res.data) {
        ToastAndroid.show("Cập nhật thông tin thành công", ToastAndroid.SHORT);
        setAppState({
          ...appState,
          user: {
            ...appState.user,
            name: name,
            phone: phone,
          },
        });
      } else {
        const m = Array.isArray(res.message) ? res.message[0] : res.message;
        ToastAndroid.show(m, ToastAndroid.SHORT);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image
            style={styles.avatar}
            source={{ uri: `${url_backend}/${appState?.user.avatar}` }}
          />
          <Text style={styles.avatarName}>{appState?.user.name}</Text>
          <Text style={styles.avatarEdit}>Sửa thông tin</Text>
        </View>

        <Formik
          initialValues={{
            fullname: appState?.user.name!,
            phone: appState?.user.phone!,
          }}
          onSubmit={(values) => handleUpdate(values.fullname, values.phone)}
          validationSchema={UpdateUserSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.formGroup}>
              <ShareInput
                title="Họ tên"
                onChangeText={handleChange("fullname")}
                onBlur={handleBlur("fullname")}
                value={values.fullname}
                error={errors.fullname}
                touched={touched.fullname}
              />

              <ShareInput
                title="Email"
                keyboardType="email-address"
                onBlur={handleBlur("email")}
                value={appState?.user.email}
                editable={false}
              />

              <ShareInput
                title="Số điện thoại"
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
                error={errors.phone}
                touched={touched.phone}
              />

              <View style={{ marginVertical: 10 }}></View>

              <ShareButton
                onPress={() => handleSubmit()}
                title="Cập nhật"
                pressStyle={{ alignSelf: "stretch" }}
                textStyle={{
                  textTransform: "uppercase",
                  fontWeight: 500,
                  fontSize: 14,
                  color: "rgba(254, 254, 254, 1)",
                }}
                btnStyle={{
                  paddingVertical: 14,
                  marginHorizontal: 5,
                  justifyContent: "center",
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: "#FFFFFF",
                  backgroundColor: APP_COLOR.PRIMARY,
                }}
              />
            </View>
          )}
        </Formik>
        <View>
          {/* <ShareButton
            onPress={() => router.push('/(auth)/forgot-password')}
            title="Đổi mật khẩu"
            pressStyle={{ alignSelf: 'stretch' }}
            textStyle={{
              textTransform: 'none',
              fontWeight: 500,
              fontSize: 14,
              textDecorationLine: 'underline',
              textDecorationStyle: 'solid',
              textDecorationColor: 'black',
            }}
            btnStyle={{
              marginTop: 10,
              justifyContent: 'center',
            }}
          /> */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UserInfoPage;
