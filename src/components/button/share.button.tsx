import {
  ActivityIndicator,
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
  isLoading?: boolean
}

const ShareButton = (props: IProps) => {
  const {
    title,
    onPress,
    textStyle,
    pressStyle,
    btnStyle,
    icons,
    isLoading = false
  } = props;

  return (
    <Pressable
      disabled={isLoading}
      onPress={onPress}
      style={({ pressed }) => ([{
        opacity: pressed === true || isLoading === true ? 0.7 : 1,
        alignSelf: 'flex-start'
      }, pressStyle])}
    >
      <View style={[styles.btnContainer, btnStyle]}>
        {icons}
        {isLoading && <ActivityIndicator />}
        <Text style={textStyle}>{title}</Text>
      </View>
    </Pressable>
  )
}

export default ShareButton