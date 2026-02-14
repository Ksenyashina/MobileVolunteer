import { FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Page from '../components/layout/Page';

const data = [
  { id: '1', title: 'Помощь приюту' },
  { id: '2', title: 'Экологическая акция' }
];

export default function EventsScreen({ navigation }) {
  return (
    <Page>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('EventDetails', { event: item })}
          >
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </Page>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12
  },
  title: { fontSize: 16, fontWeight: '600' }
});
