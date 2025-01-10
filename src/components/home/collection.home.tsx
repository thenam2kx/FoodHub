import { StyleSheet, Text, View } from "react-native"


const styles = StyleSheet.create({
  container: {
    height: 250,
    marginBottom: 6,
    width: "100%",
    backgroundColor: '#FFFFFF'
  },
})

interface IProps {
  name: string
}

const CollectionHome = (props: IProps) => {
  const { name } = props

  return (
    <View style={styles.container}>
      <Text>{name}</Text>
    </View>
  )
}

export default CollectionHome