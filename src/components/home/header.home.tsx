import { APP_COLOR } from "@/theme/theme";
import { Entypo, EvilIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  locationContainer: {
    paddingTop: 5,
    gap: 3,
    marginBottom: 5
  },
  location: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 5
  },
  locationText: {
    fontWeight: '500',
  },

  searchContainer: {
    backgroundColor: '#ecf0f1',
    gap: 5,
    flexDirection: "row",
    margin: 5,
    paddingHorizontal: 3,
    paddingVertical: 7,
    borderRadius: 3,
  },
});

const HeaderHome = () => {
  return (
    <View>
      <View style={styles.locationContainer}>
        <Text style={{ paddingLeft: 5 }}>Giao đến:</Text>
        <View style={styles.location}>
          <Entypo name="location-pin" size={20} color={APP_COLOR.PRIMARY} />
          <Text style={styles.locationText}>3P2J+Q6X, Xuân Phương, Từ Liêm, Hà Nội, Việt Nam</Text>
        </View>
      </View>

      <Pressable
      onPress={() => router.navigate('/(user)/search/search.page')}
        style={styles.searchContainer}
      >
        <EvilIcons name="search" size={20} color="black" />
        <Text style={{ color: "#707070" }}>
          Deal Hot Hôm Nay Từ 0đ...
        </Text>
      </Pressable>
    </View>
  );
};

export default HeaderHome;
