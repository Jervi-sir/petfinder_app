/* Components */
/* Screens */
/* packages */
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
/* constants */
import { colors } from "@constants/colors"
import { icons } from "@constants/icons"
import { routes } from "@constants/routes"
/* useContexts */
/*--------------*/

export const MessageList = ({navigation}) => {
  return (
    <ScrollView>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={{width: 69 - 20, height: 69 - 20 }} source={icons.BACK} />
        </TouchableOpacity>
        <Text style={{fontSize: 18, fontWeight: '700', paddingRight: 10}}>My Message</Text>
      </View>
      <MessageCard navigation={navigation} message={{id: 1, name: 'name', petImage:'require(@assets/icons/logo.png)', lastMsg: 'Last Message'}}/>
      <MessageCard navigation={navigation} message={{id: 1, name: 'name', petImage:'require(@assets/icons/logo.png)', lastMsg: 'Last Message'}}/>
      <MessageCard navigation={navigation} message={{id: 1, name: 'name', petImage:'require(@assets/icons/logo.png)', lastMsg: 'Last Message'}}/>
    </ScrollView>
  )
}

const MessageCard = ({navigation, message}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(routes.MESSAGE, {messageId: message.id}) }>
      <View style={{flexDirection: 'row', marginVertical: 5, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 5, backgroundColor: colors.white, marginHorizontal: 10, borderRadius:10}}>
        <View>
          <Image style={{width: 69 - 20, height: 69 - 20, marginRight: 17}} source={message.petImage} />
        </View>
        <View style={{flex: 1}}>
          <Text style={{fontSize:18, fontWeight: '600'}}>{message.name}</Text>
          <Text style={{fontSize: 12, fontWeight: '400'}}>{message.lastMsg}</Text>
        </View>
        <View>
          <Image style={{width: 69 - 20, height: 69 - 20, transform: [{rotateY: '180deg'}]}} source={icons.BACK} />
        </View>
      </View>
    </TouchableOpacity>
  )
}