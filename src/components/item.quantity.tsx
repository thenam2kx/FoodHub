import { currencyFormatter, getBaseUrlBackend } from "@/utils/helper";
import { APP_COLOR } from "@/theme/theme";
import { Image, Pressable, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useCurrentApp } from "@/context/app.context";
import { router } from "expo-router";

interface IProps {
  menuItem: IMenuItem;
  restaurant: IRestaurant | null;
  isModal: boolean;
}

const ItemQuantity = (props: IProps) => {
  const { menuItem, restaurant, isModal } = props;
  const { cart, setCart } = useCurrentApp();

  const handlePressItem = (item: IMenuItem, action: "MINUS" | "PLUS") => {
    if (item.options.length && isModal === false) {
      router.navigate({
        pathname: "/product/create.modal",
        params: { menuItemId: menuItem._id },
      });
    } else {
      if (restaurant?._id) {
        const total = action === "MINUS" ? -1 : 1;
        if (!cart[restaurant?._id]) {
          //chưa tồn tại cửa hàng => khởi tạo cửa hàng
          cart[restaurant._id] = {
            sum: 0,
            quantity: 0,
            items: {},
          };
        }

        //xử lý sản phẩm
        cart[restaurant._id].sum =
          cart[restaurant._id].sum + total * item.basePrice;
        cart[restaurant._id].quantity = cart[restaurant._id].quantity + total;

        //check sản phẩm đã từng thêm vào chưa
        if (!cart[restaurant._id].items[item._id]) {
          cart[restaurant._id].items[item._id] = {
            data: menuItem,
            quantity: 0,
          };
        }

        const currentQuantity =
          cart[restaurant._id].items[item._id].quantity + total;
        cart[restaurant._id].items[item._id] = {
          data: menuItem,
          quantity: currentQuantity,
        };

        if (currentQuantity <= 0) {
          delete cart[restaurant._id].items[item._id];
        }
        setCart((prevState: any) => ({ ...prevState, cart })); //merge state
      }
    }
  };

  let showMinus = false;
  let quantity = 0;
  if (restaurant?._id) {
    const store = cart[restaurant?._id!];
    if (store?.items && store?.items[menuItem?._id]) {
      showMinus = true;
      quantity = store?.items[menuItem?._id].quantity;
    }
  }

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
          source={{
            uri: `${getBaseUrlBackend()}/images/menu-item/${menuItem?.image}`,
          }}
        />
      </View>
      <View style={{ flex: 1, gap: 10 }}>
        <View>
          <Text>{menuItem.title}</Text>
        </View>
        <View>
          <Text>{menuItem.description}</Text>
        </View>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <Text style={{ color: APP_COLOR.PRIMARY }}>
            {currencyFormatter(menuItem.basePrice)}
          </Text>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              gap: 3,
            }}
          >
            {showMinus && (
              <>
                <Pressable
                  style={({ pressed }) => ({
                    opacity: pressed === true ? 0.5 : 1,
                    alignSelf: "flex-start", //fit-content
                  })}
                  onPress={() => handlePressItem(menuItem, "MINUS")}
                >
                  <AntDesign
                    name="minussquareo"
                    size={24}
                    color={APP_COLOR.PRIMARY}
                  />
                </Pressable>
                <Text
                  style={{
                    minWidth: 25,
                    textAlign: "center",
                  }}
                >
                  {quantity}
                </Text>
              </>
            )}
            <Pressable
              style={({ pressed }) => ({
                opacity: pressed === true ? 0.5 : 1,
                alignSelf: "flex-start", //fit-content
              })}
              onPress={() => handlePressItem(menuItem, "PLUS")}
            >
              <AntDesign
                name="plussquare"
                size={24}
                color={APP_COLOR.PRIMARY}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ItemQuantity;
