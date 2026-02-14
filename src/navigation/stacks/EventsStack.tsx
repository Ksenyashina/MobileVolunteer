import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EventsScreen from '../../screens/EventsScreen';
import EventDetailsScreen from '../../screens/EventDetailsScreen';

const Stack = createNativeStackNavigator();

export default function EventsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="EventsList" component={EventsScreen} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
    </Stack.Navigator>
  );
}
