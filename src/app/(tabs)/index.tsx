import { StyleSheet, View, Text, ScrollView, FlatList } from "react-native";
import CustomFlatList from "@/components/CustomFlatList/CustomFlatList";
import HeaderHome from "@/components/home/header.home";
import TopListHome from "@/components/home/topList.home";
import CollectionHome from "@/components/home/collection.home";
import { useEffect, useState } from "react";
import { router } from "expo-router";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ecf0f1",
    justifyContent: "center",
    overflow: "hidden",
  },
  header: {
    borderColor: "red",
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: "100%",
  },

  list: {
    overflow: "hidden",
  },
  sticky: {
    backgroundColor: "#fff",
    marginBottom: 6,
  },
});

const data = [
  {
    key: 1,
    name: "Top Quán Rating 5* tuần này",
    description: "Gợi ý quán được tín đồ ẩm thực đánh giá 5*",
    refAPI: "top-rating",
  },
  {
    key: 2,
    name: "Quán Mới Lên Sàn",
    description: "Khám phá ngay hàng loạt quán mới cực ngon.",
    refAPI: "newcomer",
  },
  {
    key: 3,
    name: "Ăn Thỏa Thích, Freeship 0Đ",
    description: "Bánh ngọt, chân gà, bánh tráng trộn... Freeship.",
    refAPI: "top-freeship",
  },
];

const HomeScreen = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setTimeout(() => {
      router.push("/(user)/popup/popup");
    }, 1000);
  }, [mounted]);

  return (
    <View style={styles.container}>
      <CustomFlatList
        data={data}
        style={styles.list}
        renderItem={({ item }) => (
          <CollectionHome
            name={item.name}
            description={item.description}
            refAPI={item.refAPI}
          />
        )}
        HeaderComponent={<></>}
        // HeaderComponent={<View style={styles.header}><HeaderHome /></View>}
        StickyElementComponent={
          <View style={styles.sticky}>
            <HeaderHome />
          </View>
        }
        TopListElementComponent={<TopListHome />}
      />
    </View>
  );
};

export default HomeScreen;
