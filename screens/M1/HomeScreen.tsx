/* Components */
/* Screens */
import { AdoptionSection } from './adoption/AdoptionSection';
/* packages */
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
/* constants */
import { colors } from "@constants/colors";
import { LostSection } from './lost/LostSection';
import Routes from '@utils/Routes';
/* useContexts */
/*--------------*/

const Tab = createMaterialTopTabNavigator();

export const HomeScreen = () => {
  return (
    <>

      <Tab.Navigator 
        screenOptions={{
          lazy: true,
          tabBarIndicatorStyle:{ backgroundColor: colors.menu, height: 2} ,
          tabBarLabelStyle: {fontSize: 14, fontWeight: 'bold', textTransform: 'none', color: colors.menu},
          tabBarItemStyle: { height: 42},
          animationEnabled: true,
          swipeEnabled: false,
        }}
      >
        <Tab.Screen name={Routes.AdoptionSection} component={AdoptionSection}/>
        <Tab.Screen name={Routes.LostSection} component={LostSection}/>
      </Tab.Navigator>
    </>
  )
}

