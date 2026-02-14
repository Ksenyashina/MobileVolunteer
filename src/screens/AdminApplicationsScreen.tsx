import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Page from '../components/layout/Page';

const data = [
  { id: '1', user: 'Иван', event: 'Приют животных' },
  { id: '2', user: 'Анна', event: 'Субботник' }
];

export default function AdminApplicationsScreen() {
  return (
    <Page>
      <Text style={styles.title}>Заявки пользователей</Text>

      <FlatList
        data={data}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.user}</Text>
            <Text>{item.event}</Text>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.approve}>
                <Text style={{ color: '#fff' }}>Одобрить</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.reject}>
                <Text style={{ color: '#fff' }}>Отклонить</Text>
              </TouchableOpacity>
            </View>
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
  },

  actions: {
    flexDirection: 'row',
    marginTop: 10
  },

  approve: {
    backgroundColor: '#2E7D32',
    padding: 10,
    borderRadius: 8,
    marginRight: 10
  },

  reject: {
    backgroundColor: '#C62828',
    padding: 10,
    borderRadius: 8
  }
});
