import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdminOverviewScreen from '../../screens/AdminOverviewScreen';
import AdminEventsModerationScreen from '../../screens/AdminEventsModerationScreen';
import AdminUsersScreen from '../../screens/AdminUsersScreen';

const Stack = createNativeStackNavigator();

export default function AdminStack() {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="AdminOverview"
        component={AdminOverviewScreen}
        options={{ title: 'Администрирование' }}
      />

      <Stack.Screen
        name="AdminEventsModeration"
        component={AdminEventsModerationScreen}
        options={{ title: 'Модерация мероприятий' }}
      />

      <Stack.Screen
        name="AdminUsers"
        component={AdminUsersScreen}
        options={{ title: 'Пользователи' }}
      />

    </Stack.Navigator>
  );
}
