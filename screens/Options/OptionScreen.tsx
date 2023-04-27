
import { createStackNavigator } from '@react-navigation/stack';
import { SavedScreen } from './SavedScreen';
import { MessageList } from './MessageList';
import { PetNameGenerator } from './PetNameGenerator';
import { routes } from '@constants/routes';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MessageScreen } from './MessageScreen';

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
    <View >
      <TouchableOpacity onPress={() => navigation.navigate(routes.SAVED)}>
        <Text>Saved</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(routes.MESSAGELIST)}>
        <Text>Messages</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(routes.NAMEGEN)}>
        <Text>Name Generator</Text>
      </TouchableOpacity>
    </View>
  )
}
