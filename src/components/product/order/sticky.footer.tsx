import { Pressable, Text, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { APP_COLOR } from "@/theme/theme";
import { currencyFormatter } from "@/utils/helper";
import { useCurrentApp } from "@/context/app.context";
import { router } from "expo-router";

interface IProps {
  restaurant: IRestaurant | null
}

const StickyFooter = (props: IProps) => {
  const { setCart, cart } = useCurrentApp()
  const { restaurant } = props

  const getSum = () => {
    if (restaurant && cart[restaurant._id]) {
      return cart[restaurant._id].sum
    }
    return 0
  }

  return (
    <>
      {getSum() === 0
        ?
        <></>
        :
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            zIndex: 11,
            position: "absolute",
            bottom: 0,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flex: 1,
              borderTopWidth: 1,
              borderTopColor: APP_COLOR.GREY,
            }}
          >
            <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
              <View
                style={{
                  position: "absolute",
                  left: 50,
                  top: 5,
                  width: 16,
                  height: 16,
                  borderRadius: 16 / 2,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: APP_COLOR.PRIMARY,
                }}
              >
                <Text style={{ color: "white", fontSize: 9 }}>
                  {
                    restaurant &&
                    cart &&
                    cart[restaurant?._id] &&
                    cart[restaurant?._id!]['quantity'] &&
                    <Text>{ cart[restaurant?._id!]['quantity'] }</Text>
                  }
                </Text>
              </View>
              <Pressable onPress={() => alert("cart")}>
                <FontAwesome5
                  name="shopping-basket"
                  size={30}
                  color={APP_COLOR.PRIMARY}
                />
              </Pressable>
            </View>
            <View style={{ paddingRight: 10 }}>
              <Text
                style={{
                  color: APP_COLOR.PRIMARY,
                  fontSize: 18,
                }}
              >
                {currencyFormatter(getSum())}
              </Text>
            </View>
          </View>
          <Pressable onPress={() => router.navigate('/product/order')}>
            <View
              style={{
                width: 120,
                height: '100%',
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: APP_COLOR.PRIMARY,
              }}
            >

                <Text style={{ color: "white" }}>
                  Giao hàng
                </Text>
            </View>
          </Pressable>
        </View>
      }
    </>
  );
};
export default StickyFooter;
