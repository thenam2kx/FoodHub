import React from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import BannerHome from './banner.home'

const styles = StyleSheet.create({
  topList: {
    borderColor: "orange",
    borderWidth: 1,
    marginBottom: 6,
  }
})

const data1 = [
  { key: 1, name: "Hot Deal", source: require("@/assets/homepage/icons/flash-deals.png") },
  { key: 2, name: "Quán Ngon", source: require("@/assets/homepage/icons/nice-shop.png") },
  { key: 3, name: "Tích Điểm", source: require("@/assets/homepage/icons/points.png") },
  { key: 4, name: "Ngọt Xỉu", source: require("@/assets/homepage/icons/rice.png") },
  { key: 5, name: "Quán Tiền Bối", source: require("@/assets/homepage/icons/noodles.png") },
  { key: 6, name: "Bún, Mì, Phở", source: require("@/assets/homepage/icons/bun-pho.png") },
  { key: 7, name: "BBQ", source: require("@/assets/homepage/icons/bbq.png") },
  { key: 8, name: "Fast Food", source: require("@/assets/homepage/icons/fastfood.png") },
  { key: 9, name: "Pizza", source: require("@/assets/homepage/icons/Pizza.png") },
  { key: 10, name: "Burger", source: require("@/assets/homepage/icons/burger.png") },
  { key: 11, name: "Sống Khỏe", source: require("@/assets/homepage/icons/egg-cucmber.png") },
  { key: 12, name: "Giảm 50k", source: require("@/assets/homepage/icons/moi-moi.png") },
  { key: 13, name: "99k Off", source: require("@/assets/homepage/icons/fried-chicken.png") },
  { key: 14, name: "No Bụng", source: require("@/assets/homepage/icons/korean-food.png") },
  { key: 15, name: "Freeship", source: require("@/assets/homepage/icons/Steak.png") },
  { key: 16, name: "Deal 0Đ", source: require("@/assets/homepage/icons/tomato.png") },
  { key: 17, name: "Món 1Đ", source: require("@/assets/homepage/icons/elipse.png") },
  { key: 18, name: "Ăn chiều", source: require("@/assets/homepage/icons/chowmein.png") },
  { key: 19, name: "Combo 199k", source: require("@/assets/homepage/icons/Notif.png") },
  { key: 20, name: "Milk Tea", source: require("@/assets/homepage/icons/salad.png") },
]


const TopListHome = () => {
  return (
    <>
      <View style={{ marginTop: 0, marginBottom: 10 }}>
        <BannerHome />
      </View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          directionalLockEnabled={true}
          alwaysBounceVertical={false}
        >
          <FlatList
            contentContainerStyle={{ alignSelf: 'flex-start' }}
            numColumns={Math.ceil(data1.length / 2)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={data1}
            renderItem={({ item, index }) => {
              return (
                <View style={{
                  padding: 5,
                  width: 100,
                  alignItems: "center",
                }}>
                  <Image
                    source={item.source}
                    style={{ height: 35, width: 35, }}
                  />
                  <Text style={{ textAlign: "center" }}>
                    {item.name}
                  </Text>
                </View>
              )
            }}
          />
        </ScrollView>
      </View>
    </>
  )
}

export default TopListHome