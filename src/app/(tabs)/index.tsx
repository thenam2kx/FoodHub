import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native'
import CustomFlatList from '@/components/CustomFlatList/CustomFlatList'
import HeaderHome from '@/components/home/header.home'
import TopListHome from '@/components/home/topList.home'


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ecf0f1",
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
  },
  header: {
    borderColor: "red",
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: "100%"
  },
  item: {
    borderColor: "green",
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: "100%"
  },
  list: {
    overflow: "hidden"
  },
  sticky: {
    backgroundColor: "#2555FF50",
    borderColor: "blue",
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: "100%"
  },
})

const data = Array(10).fill(1)


const HomeScreen = () => {

  return (
    <View style={styles.container}>
      <CustomFlatList
        data={data}
        style={styles.list}
        renderItem={() => <View style={styles.item} />}
        HeaderComponent={<></>}
        // HeaderComponent={<View style={styles.header}><HeaderHome /></View>}
        StickyElementComponent={<View style={styles.sticky}><HeaderHome /></View>}
        TopListElementComponent={<TopListHome />}
      />
    </View>
  );
}



export default HomeScreen