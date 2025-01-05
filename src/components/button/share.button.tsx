import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle
} from "react-native"

const styles = StyleSheet.create({
  btnContainer: {
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
})

interface IProps {
  title: string
  textStyle?: StyleProp<TextStyle>
  pressStyle?: StyleProp<ViewStyle>
  btnStyle?: StyleProp<ViewStyle>
  icons?: React.ReactNode
  onPress: () => void
}

const ShareButton = (props: IProps) => {
  const { title, onPress, textStyle, pressStyle, btnStyle, icons } = props;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ([{
        opacity: pressed ? 0.7 : 1,
        alignSelf: 'flex-start'
      }, pressStyle])}
    >
      <View style={[styles.btnContainer, btnStyle]}>
        {icons}
        <Text style={textStyle}>{title}</Text>
      </View>
    </Pressable>
  )
}

export default ShareButton