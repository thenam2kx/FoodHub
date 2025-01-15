import { getBaseUrlBackend } from "@/utils/helper";
import { currencyFormatter } from "@/utils/helper";
import { APP_COLOR } from "@/theme/theme";
import { Image, Pressable, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useCurrentApp } from "@/context/app.context";

interface IProps {
  menuItem: IMenuItem;
  restaurant: IRestaurant | null
}
const ItemQuantity = (props: IProps) => {
  const { menuItem, restaurant } = props;
  const { setCart, cart } = useCurrentApp()

  const handlePressItem = (item: IMenuItem, action: 'MINUS' | 'PLUS') => {
    if (restaurant?._id) {
      const total = action === 'MINUS' ? -1 : 1

      // If the restaurant does not exist => create the restaurant
      if (!cart[restaurant?._id]) {
        cart[restaurant._id] = {
          sum: 0,
          quantity: 0,
          items: {}
        }
      }

      // Handle update product
      cart[restaurant._id].sum = cart[restaurant._id].sum + total * item.basePrice
      cart[restaurant._id].quantity = cart[restaurant._id].quantity + total

      // If the product does not exist => create the product
      if (!cart[restaurant._id].items[item._id]) {
        cart[restaurant._id].items[item._id] = {
          data: menuItem,
          quantity: 0,
        }
      }

      // Handle update product
      const currentQuantity = cart[restaurant._id].items[item._id].quantity + total
      cart[restaurant._id].items[item._id] = {
        data: menuItem,
        quantity: currentQuantity,
      }

      // Delete cart item when quantity <= 0
      if (currentQuantity <= 0) {
        delete cart[restaurant._id].items[item._id]
      }
      setCart((prevState: any) => ({ ...prevState, cart }))
    }
  }

  const showMinus = cart[restaurant?._id!]?.items[menuItem._id] ?? false
  const quantity = cart[restaurant?._id!]?.items[menuItem?._id]?.quantity ?? 0

  return (
    <View
      style={{
        backgroundColor: "white",
        gap: 10,
        flexDirection: "row",
        padding: 10,
      }}
    >
      <View>
        <Image
          style={{ height: 100, width: 100 }}
          source={{ uri: `${getBaseUrlBackend()}/images/menu-item/${menuItem?.image}` }}
        />
      </View>
      <View style={{ flex: 1, gap: 10 }}>
        <View><Text>{menuItem.title}</Text></View>
        <View><Text>{menuItem.description}</Text></View>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <Text>{currencyFormatter(menuItem.basePrice)}</Text>
          <View style={{ alignItems: "center", flexDirection: "row", gap: 3 }}>
            {
              showMinus && (
                <>
                  <Pressable
                    style={({ pressed }) => ({
                      opacity: pressed === true ? 0.5 : 1,
                      alignSelf: 'flex-start'
                    })}
                    onPress={() => handlePressItem(menuItem, 'MINUS')}
                  >
                    <AntDesign name="minussquareo" size={24} color={APP_COLOR.PRIMARY} />
                  </Pressable>

                  <Text style={{ minWidth: 25, textAlign: "center" }}>{quantity}</Text>
                </>
              )
            }

            <Pressable
              style={({ pressed }) => ({
                opacity: pressed === true ? 0.5 : 1,
                alignSelf: 'flex-start'
              })}
              onPress={() => handlePressItem(menuItem, 'PLUS')}
            >
              <AntDesign name="plussquare" size={24} color={APP_COLOR.PRIMARY} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};
export default ItemQuantity;
