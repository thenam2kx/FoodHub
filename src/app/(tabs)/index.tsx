import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native'
import CustomFlatList from '@/components/CustomFlatList/CustomFlatList'
import HeaderHome from '@/components/home/header.home'
import TopListHome from '@/components/home/topList.home'
import CollectionHome from '@/components/home/collection.home'


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ecf0f1",
    justifyContent: "center",
    overflow: "hidden"
  },
  header: {
    borderColor: "red",
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: "100%"
  },

  list: {
    overflow: "hidden"
  },
  sticky: {
    backgroundColor: "#fff",
    marginBottom: 6,
  },
})

const data = [
  { key: 1, name: "Top Quán Rating 5* tuần này", ref: "" },
  { key: 2, name: "Quán Mới Lên Sàn", ref: "" },
  { key: 3, name: "Ăn Thỏa Thích, Freeship 0Đ", ref: "" },
]



const HomeScreen = () => {

  return (
    <View style={styles.container}>
      <CustomFlatList
        data={data}
        style={styles.list}
        renderItem={({ item }) => <CollectionHome name={item.name} />}
        HeaderComponent={<></>}
        // HeaderComponent={<View style={styles.header}><HeaderHome /></View>}
        StickyElementComponent={<View style={styles.sticky}><HeaderHome /></View>}
        TopListElementComponent={<TopListHome />}
      />
    </View>
  );
}



export default HomeScreen