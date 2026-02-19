import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdminOverviewScreen from '../../screens/AdminOverviewScreen';
import AdminEventsModerationScreen from '../../screens/AdminEventsModerationScreen';
import AdminUsersScreen from '../../screens/AdminUsersScreen';
import AdminScreen from '../../screens/AdminScreen';
const Stack = createNativeStackNavigator();

export default function AdminStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen
        name="Admin"
        component={AdminScreen}
      />

      <Stack.Screen
        name="AdminEventsModeration"
        component={AdminEventsModerationScreen}
      />

      <Stack.Screen
        name="AdminUsers"
        component={AdminUsersScreen}
      />

    </Stack.Navigator>
  );
}
