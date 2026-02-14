import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DashboardStack from '../stacks/DashboardStack';
import EventsStack from '../stacks/EventsStack';
import MyApplicationsScreen from '../../screens/MyApplicationsScreen';

const Tab = createBottomTabNavigator();

export default function UserTabs() {
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
        name="MyApplications"
        component={MyApplicationsScreen}
        options={{ title: 'Мои заявки' }}
      />

    </Tab.Navigator>
  );
}
