import ShareInput from "@/components/input/share.input";
import { updateUserPasswordAPI } from "@/utils/api";
import { APP_COLOR } from "@/theme/theme";
import { UpdatePasswordSchema } from "@/utils/validate.schema";
import { Formik, FormikProps } from "formik";
import { useRef } from "react";
import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
  ToastAndroid,
} from "react-native";

const UserPassword = () => {
  const formikRef = useRef<FormikProps<any>>(null);

  const handleUpdatePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    const res = await updateUserPasswordAPI(currentPassword, newPassword);
    if (res.data) {
      ToastAndroid.show("Cập nhật mật khẩu thành công!", ToastAndroid.SHORT);

      formikRef?.current?.resetForm();
    } else {
      const m = Array.isArray(res.message) ? res.message[0] : res.message;

      ToastAndroid.show(m, ToastAndroid.SHORT);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: 10,
            paddingTop: 20,
          }}
        >
          <Formik
            innerRef={formikRef}
            validationSchema={UpdatePasswordSchema}
            initialValues={{
              currentPassword: "",
              newPassword: "",
              confirmNewPassword: "",
            }}
            onSubmit={(values) =>
              handleUpdatePassword(
                values?.currentPassword ?? "",
                values?.newPassword ?? ""
              )
            }
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
              dirty,
            }) => (
              <View style={{ marginTop: 20, gap: 20 }}>
                <ShareInput
                  title="Mật khẩu hiện tại"
                  secureTextEntry={true}
                  onChangeText={handleChange("currentPassword")}
                  onBlur={handleBlur("currentPassword")}
                  value={values.currentPassword}
                  error={errors.currentPassword}
                  touched={touched.currentPassword}
                />

                <ShareInput
                  title="Mật khẩu mới"
                  secureTextEntry={true}
                  onChangeText={handleChange("newPassword")}
                  onBlur={handleBlur("newPassword")}
                  value={values.newPassword}
                  error={errors.newPassword}
                  touched={touched.newPassword}
                />

                <ShareInput
                  title="Xác nhận mật khẩu mới"
                  secureTextEntry={true}
                  onChangeText={handleChange("confirmNewPassword")}
                  onBlur={handleBlur("confirmNewPassword")}
                  value={values.confirmNewPassword}
                  error={errors.confirmNewPassword}
                  touched={touched.confirmNewPassword}
                />

                <Pressable
                  disabled={!(isValid && dirty)}
                  onPress={handleSubmit as any}
                  style={({ pressed }) => ({
                    opacity: pressed === true ? 0.5 : 1,
                    backgroundColor:
                      isValid && dirty ? APP_COLOR.PRIMARY : APP_COLOR.GREY,
                    padding: 10,
                    marginTop: 10,
                    borderRadius: 3,
                  })}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: isValid && dirty ? "white" : "grey",
                    }}
                  >
                    Lưu thay đổi
                  </Text>
                </Pressable>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UserPassword;
