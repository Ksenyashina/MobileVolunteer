import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashboardScreen from '../../screens/DashboardScreen';
import ProfileSettingsScreen from '../../screens/ProfileSettingsScreen';

export type DashboardStackParamList = {
  Dashboard: undefined;
  ProfileSettings: undefined;
};

const Stack = createNativeStackNavigator<DashboardStackParamList>();

export default function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
    </Stack.Navigator>
  );
}
