import { NavigationContainer } from '@react-navigation/native';

import AuthNavigation from '@screens/Navigations/AuthNavigation';


export default function App() {
  return (
    <NavigationContainer>
      <AuthNavigation />
    </NavigationContainer>
  );
}

