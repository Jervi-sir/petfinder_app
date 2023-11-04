
/* Components */
/* Screens */
import { SavedScreen } from './saved/SavedScreen';
import { MessageList } from './messages/MessageList';
import { MessageScreen } from './messages/MessageScreen';
import { PetNameGenerator } from './nameGenerator/PetNameGenerator';
/* packages */
import { Text, TouchableOpacity, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
/* constants */
import { routes } from '@constants/routes';
import { colors } from '@constants/colors';
import { useAuth } from '@context/AuthContext';
import { useEffect } from 'react';
import Routes from '@utils/Routes';
/* useContexts */
/*--------------*/

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
  const { BearerToken } = useAuth();
  useEffect(() => {

  }, [BearerToken]);

  const goToScreen = (routeName) => {
    if (BearerToken !== null) {
      navigation.navigate(routeName)
    } else {
      navigation.navigate(Routes.AUTH)
    }
  }

  return (
    <View style={{ height: '100%', justifyContent: 'center' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
        <View style={{ backgroundColor: colors.white, paddingHorizontal: 35, paddingVertical: 27, borderRadius: 11 }}>
          <TouchableOpacity onPress={() => goToScreen(routes.SAVED)}>
            <Text style={{ textAlign: 'center' }}>Saved</Text>
          </TouchableOpacity>
          <View style={{ height: 1, borderRadius: 100, opacity: 0.7, marginVertical: 12 }}></View>
          <TouchableOpacity onPress={() => goToScreen(routes.MESSAGELIST)}>
            <Text style={{ textAlign: 'center' }}>Messages</Text>
          </TouchableOpacity>
          <View style={{ height: 1, borderRadius: 100, opacity: 0.7, marginVertical: 12 }}></View>
          <TouchableOpacity onPress={() => navigation.navigate(routes.NAMEGEN)}>
            <Text style={{ textAlign: 'center' }}>Name Generator</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
