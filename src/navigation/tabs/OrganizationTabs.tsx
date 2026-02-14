import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DashboardStack from '../stacks/DashboardStack';
import EventsStack from '../stacks/EventsStack';
import OrganizationApplicationsScreen from '../../screens/OrganizationApplicationsScreen';

const Tab = createBottomTabNavigator();

export default function OrganizationTabs() {
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
        component={OrganizationApplicationsScreen}
        options={{ title: 'Заявки' }}
      />

    </Tab.Navigator>
  );
}
