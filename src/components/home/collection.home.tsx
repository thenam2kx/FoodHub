import { FlatList, Image, StyleSheet, Text, View } from "react-native"
import demoImg from '@/assets/demo.jpg'
import { APP_COLOR } from "@/theme/theme"
import { useEffect, useState } from "react"
import { getTopRestaurantAPI } from "@/utils/api"

const styles = StyleSheet.create({
  container: {
    // height: 250,
    padding: 10,
    marginBottom: 6,
    width: "100%",
    backgroundColor: '#FFFFFF'
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: APP_COLOR.PRIMARY,
    fontSize: 16,
    fontWeight: "600"
  },
  headerViewAll: {
    color: "#5a5a5a"
  },

  description: {
    color: "#5a5a5a",
    paddingVertical: 5
  },

  btnSale: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: APP_COLOR.PRIMARY,
    padding: 3,
    borderRadius: 3,
    alignSelf: "flex-start"
  }
})

const data = [
  {
    key: 1,
    image: demoImg,
    name: 'cua hang 1'
  },
  {
    key: 2,
    image: demoImg,
    name: 'cua hang 2'
  },
  {
    key: 3,
    image: demoImg,
    name: 'cua hang 3'
  },
  {
    key: 4,
    image: demoImg,
    name: 'cua hang 4'
  },
  {
    key: 5,
    image: demoImg,
    name: 'cua hang 5'
  },
]

interface IProps {
  name: string
  description: string,
  refAPI: string
}

const CollectionHome = (props: IProps) => {
  const { name, description, refAPI } = props

  const [restaurants, setRestaurants] = useState<ITopRestaurant[]>([])

  const url_backend = `${process.env.EXPO_PUBLIC_API_URL}/images/restaurant`

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTopRestaurantAPI(refAPI)
      if (res.data) {
        setRestaurants(res.data)
      } else {

      }
    }
    fetchData()
  }, [refAPI])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{name}</Text>
        <Text style={styles.headerViewAll}>Xem tất cả &gt;</Text>
      </View>

      <View>
        <Text style={styles.description}>{description}</Text>
      </View>

      <FlatList
        data={restaurants}
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 5 }}
        renderItem={({item}) => {
          return (
            <View>
              <Image style={{ height: 120, width: 120 }} source={{ uri: `${url_backend}/${item.image}` }} />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ padding: 4, fontWeight: 500, maxWidth: 120 }}
                >
                {item.name}
                </Text>
              <View style={{ paddingHorizontal: 4 }}>
                <View style={styles.btnSale}>
                  <Text style={{ color: APP_COLOR.PRIMARY }}>Flash Sale</Text>
                </View>
              </View>
            </View>
          )
        }}
      />
    </View>
  )
}

export default CollectionHome