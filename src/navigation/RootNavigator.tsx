import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PublicScreen from '../screens/PublicScreen';
import AuthStack from './stacks/AuthStack';
import ModelsStack from './stacks/ModelsStack';
import MainTabs from './tabs/MainTabs';

export type RootStackParamList = {
  Public: undefined;
  Auth: undefined;
  App: undefined;
  Main: undefined;
  Models: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Обертки для навигаторов
const AuthStackScreen = () => <AuthStack />;
const MainTabsScreen = () => <MainTabs />;
const ModelsScreen = () => <ModelsStack/>
export default function RootNavigator() {
  // Временная заглушка для демонстрации
  const userRole = 'user'; // 'user', 'volunteer', 'organizer', 'admin'

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Public" component={PublicScreen} />
            <Stack.Screen name="Auth" component={AuthStackScreen} />
          <Stack.Screen name="App" component={MainTabsScreen} />
          <Stack.Screen name="Models" component={ModelsScreen} options={{ presentation: 'modal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}