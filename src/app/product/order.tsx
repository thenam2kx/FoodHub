import HeaderHome from "@/components/home/header.home";
import { useCurrentApp } from "@/context/app.context";
import { currencyFormatter, getBaseUrlBackend } from "@/utils/helper";
import { APP_COLOR } from "@/theme/theme";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, ToastAndroid, View } from "react-native";
import { placeOrderAPI } from "@/utils/api";
import { router } from "expo-router";
interface IOrderItem {
  image: string;
  title: string;
  option: string;
  price: number;
  quantity: number;
}
const OrderPage = () => {
  const { restaurant, cart, setCart } = useCurrentApp();
  const [orderItems, setOrderItems] = useState<IOrderItem[]>([]);

  const handleOrder = async () => {
    const data = {
      restaurant: restaurant?._id,
      totalPrice: cart?.[restaurant!._id].sum,
      totalQuantity: cart?.[restaurant!._id].quantity,
      detail: orderItems,
    };
    const res = await placeOrderAPI(data);
    if (res.data) {
      //success
      ToastAndroid.show('Đặt hàng thành công', ToastAndroid.SHORT);
      //clear data cart
      if (restaurant) {
        delete cart[restaurant._id];
        setCart((prevCart: any) => ({ ...prevCart, ...cart }));
      }
      router.replace("/order");
    } else {
      const m = Array.isArray(res.message) ? res.message[0] : res.message;
      ToastAndroid.show(m, ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    if (cart && restaurant && restaurant._id) {
      const result = [];
      for (const [menuItemId, currentItems] of Object.entries(
        cart[restaurant._id].items
      )) {
        if (currentItems.extra) {
          for (const [key, value] of Object.entries(currentItems.extra)) {
            const option = currentItems.data.options?.find(
              (item) =>  `${item.title}-${item.description}` === key
            );
            const addPrice = option?.additionalPrice ?? 0;
            result.push({
              image: currentItems.data.image,
              title: currentItems.data.title,
              option: key,
              price: currentItems.data.basePrice + addPrice,
              quantity: value,
            });
          }
        } else {
          result.push({
            image: currentItems.data.image,
            title: currentItems.data.title,
            option: "",
            price: currentItems.data.basePrice,
            quantity: currentItems.quantity,
          });
        }
        setOrderItems(result);
      }
    }
  }, [restaurant]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          borderBottomColor: "#eee",
          borderBottomWidth: 1,
          padding: 10,
        }}
      >
        <HeaderHome />
      </View>

      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontWeight: "600",
          }}
        >
          {restaurant?.name}
        </Text>
      </View>

      <ScrollView style={{ flex: 1, padding: 10 }}>
        {orderItems?.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                gap: 10,
                flexDirection: "row",
                borderBottomColor: "#eee",
                borderBottomWidth: 1,
                paddingVertical: 10,
              }}
            >
              <Image
                style={{ height: 50, width: 50 }}
                source={{
                  uri: `${getBaseUrlBackend()}/images/menu-item/${item.image}`,
                }}
              />
              <View>
                <Text style={{ fontWeight: "600" }}>{item.quantity} x</Text>
              </View>
              <View style={{ gap: 10 }}>
                <Text>{item.title}</Text>
                <Text style={{ fontSize: 12, color: APP_COLOR.GREY }}>
                  {item.option}
                </Text>
              </View>
            </View>
          );
        })}
        {orderItems?.length > 0 && (
          <View style={{ marginVertical: 15 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: APP_COLOR.GREY }}>
                Tổng cộng ({restaurant && cart?.[restaurant._id] && cart?.[restaurant._id].quantity} món)
              </Text>
              <Text>{currencyFormatter(restaurant && cart?.[restaurant._id] && cart?.[restaurant._id].sum)}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      <View
        style={{
          gap: 20,
          marginBottom: 60,
          padding: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Pressable
            style={{
              borderWidth: 1,
              borderColor: APP_COLOR.GREY,
              flex: 1,
              padding: 7,
            }}
          >
            <Text
              style={{
                color: APP_COLOR.GREY,
                textAlign: "center",
              }}
            >
              Ví PayPal
            </Text>
          </Pressable>
          <Pressable
            style={{
              borderWidth: 1,
              borderColor: APP_COLOR.PRIMARY,
              flex: 1,
              padding: 7,
            }}
          >
            <Text
              style={{
                color: APP_COLOR.PRIMARY,
                textAlign: "center",
              }}
            >
              Tiền mặt
            </Text>
          </Pressable>
        </View>
        <View>
          <Pressable
            onPress={handleOrder}
            style={({ pressed }) => ({
              opacity: pressed === true ? 0.5 : 1,
              padding: 10,
              backgroundColor: APP_COLOR.PRIMARY,
              borderRadius: 3,
            })}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
              }}
            >
              Đặt đơn - {``}
              {currencyFormatter(cart && restaurant && cart?.[restaurant._id] && cart?.[restaurant._id].sum)}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
export default OrderPage;
