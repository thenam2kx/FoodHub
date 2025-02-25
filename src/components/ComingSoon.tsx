import React from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import { APP_COLOR } from "@/theme/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    objectFit: 'cover',
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: APP_COLOR.PRIMARY,
  },
  subtitle: {
    fontSize: 16,
    color: "#AAAAAA",
    textAlign: "center",
    marginTop: 10,
  },
});

const ComingSoon = () => {
  return (
    <ImageBackground style={{ flex: 1 }} source={require('@/assets/auth/welcome-background.png')}>
      <View style={styles.container}>
        <Text style={styles.title}>Coming Soon</Text>
        <Text style={styles.subtitle}>Chúng tôi đang xây dựng một điều tuyệt vời!</Text>
      </View>
    </ImageBackground>
  )
}

export default ComingSoon
