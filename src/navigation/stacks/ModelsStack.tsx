import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RulesScreen from '../../components/modals/RulesModal';
import AboutScreen from '../../components/modals/AboutModal';
import ContactsScreen from '../../components/modals/ContactsModal';
import StatsScreen from '../../components/modals/StatsModal';

const Stack = createNativeStackNavigator();

export default function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Rules" component={RulesScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Contacts" component={ContactsScreen} />
        <Stack.Screen name="Stats" component={StatsScreen} />
    </Stack.Navigator>
  );
}
