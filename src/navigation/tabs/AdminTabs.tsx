import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DashboardStack from '../stacks/DashboardStack';
import AdminStack from '../stacks/AdminStack';

const Tab = createBottomTabNavigator();

export default function AdminTabs() {
  return (
    <Tab.Navigator>

  <Tab.Screen
    name="Events"
    component={EventsStack}
    options={{ title: 'Мероприятия' }}
  />

  <Tab.Screen
    name="Cabinet"
    component={DashboardStack}
    options={{ title: 'Кабинет' }}
  />

  <Tab.Screen
    name="Admin"
    component={AdminStack}
    options={{ title: 'Администрирование' }}
  />

</Tab.Navigator>

  );
}
