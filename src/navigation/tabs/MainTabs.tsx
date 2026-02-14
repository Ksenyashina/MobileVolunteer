import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DashboardStack from '../stacks/DashboardStack';
import EventsStack from '../stacks/EventsStack';
import MyApplicationsScreen from '../../screens/MyApplicationsScreen';
import AdminStack from '../stacks/AdminStack';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator>

      <Tab.Screen
        name="Cabinet"
        component={DashboardStack}
        options={{ title: 'Кабинет' }}
      />

      <Tab.Screen
        name="Events"
        component={EventsStack}
        options={{ title: 'Мероприятия' }}
      />

      <Tab.Screen
        name="Applications"
        component={MyApplicationsScreen}
        options={{ title: 'Заявки' }}
      />

      <Tab.Screen
        name="Admin"
        component={AdminStack}
        options={{ title: 'Админ' }}
      />

    </Tab.Navigator>
  );
}
