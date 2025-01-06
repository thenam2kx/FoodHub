import { APP_COLOR } from "@/theme/theme"
import { useState } from "react"
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from "react-native"
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  inputGroup: {
    padding: 5,
    gap: 10
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: '500'
  },
  inputForm: {
    borderColor: 'green',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10
  },
  eye: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: '-50%' }]
  }
})

interface Iprops {
  title?: string
  keyboardType?: KeyboardTypeOptions
  secureTextEntry?: boolean
  value: any
  setValue: (v: any) => void
}

const ShareInput = (props: Iprops) => {
  const {
    title,
    value,
    setValue,
    keyboardType,
    secureTextEntry = false
  } = props
  const [isFocus, setIsFocus] = useState<boolean>(false)
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

  return (
    <View style={styles.inputGroup}>
      {
        title &&
        <Text style={styles.inputLabel}>{title}</Text>
      }
      <View>
        <TextInput
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          value={value}
          onChangeText={(text) => setValue(text)}
          style={[styles.inputForm, { borderColor: isFocus ? APP_COLOR.PRIMARY : '#d0d0d0' }]}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry && !isShowPassword}
        />
        {
          secureTextEntry &&
          <FontAwesome5
            name={isShowPassword ? 'eye' : 'eye-slash' }
            size={16}
            color="black"
            style={styles.eye}
            onPress={() => setIsShowPassword(!isShowPassword)}
          />
        }
      </View>
    </View>
  )
}

export default ShareInput