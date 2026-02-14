import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashboardScreen from '../../screens/DashboardScreen';
import ProfileSettingsScreen from '../../screens/ProfileSettingsScreen';

const Stack = createNativeStackNavigator();

export default function DashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
    </Stack.Navigator>
  );
}
