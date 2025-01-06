import { Text, View } from "react-native";

interface IProps {
  title: string
  textColor?: string
  lineColor?: string
}
const TextBetweenLine = (props: IProps) => {
  const { title, textColor, lineColor } = props;
  return (
    <View style={{
      flexDirection: "row",
      gap: 15,
      justifyContent: "center"
    }}>
      <View style={{
        borderBottomColor: lineColor,
        borderBottomWidth: 1,
        paddingHorizontal: 45
      }}>
      </View>

      <Text style={{
        color: textColor,
        position: "relative",
        top: 10,
        fontWeight: '500'
      }}>{title}</Text>

      <View style={{
        borderBottomColor: lineColor,
        borderBottomWidth: 1,
        paddingHorizontal: 45
      }}>
      </View>
    </View>
  )
}

export default TextBetweenLine;