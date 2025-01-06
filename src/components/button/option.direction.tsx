import { Link, LinkProps } from "expo-router"
import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native"

interface IProps {
  url: LinkProps['href']
  styleContainer?: StyleProp<ViewStyle>
  textIntro?: string
  styleTextIntro?: StyleProp<TextStyle>
  textDirection: string
  styleTextDirection?: StyleProp<TextStyle>
}

const OptionDirection = (props: IProps) => {
  const {
    url,
    textIntro,
    styleTextIntro,
    textDirection,
    styleContainer,
    styleTextDirection,
  } = props

  return (
    <View style={[
      { flexDirection: 'row', gap: 6, justifyContent: 'center' },
      styleContainer
    ]}>
      <Text style={[
        { textAlign: "center", color: '#FFFFFF' },
        styleTextIntro
      ]}>
        {textIntro}
      </Text>
      <Link href={url}>
        <Text style={[
          { textAlign: "center", color: '#FFFFFF', textDecorationLine: 'underline' },
          styleTextDirection
        ]}>
          {textDirection}
        </Text>
      </Link>
    </View>
  )
}

export default OptionDirection