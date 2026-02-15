import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PublicScreen from '../screens/PublicScreen';
import AuthStack from './stacks/AuthStack';
import MainTabs from './tabs/MainTabs';

export type RootStackParamList = {
  Public: undefined;
  Auth: undefined;
  App: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Обертки для навигаторов
const AuthStackScreen = () => <AuthStack />;
const MainTabsScreen = () => <MainTabs />;

export default function RootNavigator() {
  // Временная заглушка для демонстрации
  const userRole = 'user'; // 'user', 'volunteer', 'organizer', 'admin'

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Public" component={PublicScreen} />
            <Stack.Screen name="Auth" component={AuthStackScreen} />
          <Stack.Screen name="App" component={MainTabsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}