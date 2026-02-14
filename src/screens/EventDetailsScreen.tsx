import { View, Text } from 'react-native';
import Page from '../components/layout/Page';

export default function EventDetailsScreen({ route }) {
  const { event } = route.params;

  return (
    <Page>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>
        {event.title}
      </Text>

      <Text style={{ marginTop: 10 }}>
        Подробная информация о мероприятии...
      </Text>
    </Page>
  );
}
