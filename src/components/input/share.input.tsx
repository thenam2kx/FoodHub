import { APP_COLOR } from "@/theme/theme"
import { useState } from "react"
import {
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  Text,
  View
} from "react-native"
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

interface IProps {
  keyboardType?: KeyboardTypeOptions
  secureTextEntry?: boolean
  setValue?: (v: any) => void
  placeholder?: string
  onChangeText?: any
  title?: string
  value: any
  onBlur?: any
  error?: any
  touched?: any
  editable?: boolean
}

const ShareInput = (props: IProps) => {
  const {
    title,
    value,
    keyboardType,
    secureTextEntry = false,
    placeholder = '',
    onChangeText,
    onBlur,
    error,
    touched,
    editable= true
  } = props
  const [isFocus, setIsFocus] = useState<boolean>(false)
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

  return (
    <View style={styles.inputGroup}>
      { title && <Text style={styles.inputLabel}>{title}</Text> }
      <View>
        <TextInput
          editable={editable}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocus(true)}
          onBlur={(e) => { if ( onBlur ) onBlur(e); setIsFocus(false) }}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry && !isShowPassword}
          style={[styles.inputForm, { borderColor: isFocus ? APP_COLOR.PRIMARY : '#d0d0d0' }]}
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
      { error && touched && <Text style={{ color: APP_COLOR.PRIMARY,  fontSize: 14 }}>{error}</Text> }
    </View>
  )
}

export default ShareInput
