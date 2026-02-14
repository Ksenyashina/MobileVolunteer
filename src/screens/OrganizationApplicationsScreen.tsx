import { View, Text, StyleSheet, FlatList } from 'react-native';
import Page from '../components/layout/Page';

const data = [
  { id: '1', user: 'Иван', event: 'Субботник' },
  { id: '2', user: 'Анна', event: 'Приют животных' }
];

export default function OrganizationApplicationsScreen() {
  return (
    <Page>

      <Text style={styles.title}>Заявки на мероприятия</Text>

      <FlatList
        data={data}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.user}</Text>
            <Text>{item.event}</Text>
          </View>
        )}
      />

    </Page>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12
  }
});
