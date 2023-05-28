
import { createStackNavigator } from '@react-navigation/stack';
import { SavedScreen } from './SavedScreen';
import { MessageList } from './MessageList';
import { PetNameGenerator } from './PetNameGenerator';
import { routes } from '@constants/routes';
import { Text, TouchableOpacity, View } from 'react-native';
import { MessageScreen } from './MessageScreen';
import { colors } from '@constants/colors';

const Stack = createStackNavigator();

export const OptionScreen = () => {
  return (
    <>
    <Stack.Navigator 
      initialRouteName={routes.OPTIONLIST}
      screenOptions={() => ({
        headerShown: false,
        headerLeft: null,
      })}
    >
      <Stack.Screen name={routes.OPTIONLIST} component={OptionList} />
      <Stack.Screen name={routes.SAVED} component={SavedScreen} />
      <Stack.Screen name={routes.MESSAGELIST} component={MessageList} />
      <Stack.Screen name={routes.MESSAGE} component={MessageScreen} />
      <Stack.Screen name={routes.NAMEGEN} component={PetNameGenerator} />
    </Stack.Navigator>
    </>
  )
}

const OptionList = ({ navigation }) => {
  return (
    <View style={{height: '100%', justifyContent: 'center'}}>
      <View style={{flexDirection: 'row', justifyContent: 'center', }}>
        <View style={{backgroundColor: colors.white, paddingHorizontal: 35, paddingVertical: 27, borderRadius: 11}}>
          <TouchableOpacity onPress={() => navigation.navigate(routes.SAVED)}>
            <Text style={{textAlign: 'center'}}>Saved</Text>
          </TouchableOpacity>
          <View style={{height: 1, borderRadius:100, opacity: 0.7, marginVertical: 12}}></View>
          <TouchableOpacity onPress={() => navigation.navigate(routes.MESSAGELIST)}>
            <Text style={{textAlign: 'center'}}>Messages</Text>
          </TouchableOpacity>
          <View style={{height: 1, borderRadius:100, opacity: 0.7, marginVertical: 12}}></View>
          <TouchableOpacity onPress={() => navigation.navigate(routes.NAMEGEN)}>
            <Text style={{textAlign: 'center'}}>Name Generator</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
