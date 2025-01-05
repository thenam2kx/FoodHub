import { Text, View } from "react-native";

interface IProps {
  title: string;
}
const TextBetweenLine = (props: IProps) => {
  const { title } = props;
  return (
    <View style={{
      flexDirection: "row",
      gap: 15,
      justifyContent: "center"
    }}>
      <View style={{
        borderBottomColor: "rgba(255, 255, 255, 0.5)",
        borderBottomWidth: 1,
        paddingHorizontal: 45
      }}>
      </View>

      <Text style={{
        color: "white",
        position: "relative",
        top: 10,
        fontWeight: '500'
      }}>{title}</Text>

      <View style={{
        borderBottomColor: "rgba(255, 255, 255, 0.5)",
        borderBottomWidth: 1,
        paddingHorizontal: 45
      }}>
      </View>
    </View>
  )
}

export default TextBetweenLine;