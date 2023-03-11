import { StatusBar } from '@components/StatusBar';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from '@screens/Navigations/AppNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar />
      <AppNavigation />
    </NavigationContainer>
  );
}

