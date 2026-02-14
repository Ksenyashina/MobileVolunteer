import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Page from '../components/layout/Page';

const events = [
  { id: '1', title: 'Субботник', org: 'ЭкоФонд' },
  { id: '2', title: 'Помощь приюту', org: 'Добро' }
];

export default function AdminEventsModerationScreen() {
  return (
    <Page>

      <Text style={styles.title}>Модерация мероприятий</Text>

      <FlatList
        data={events}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>

            <Text style={styles.event}>{item.title}</Text>
            <Text style={styles.org}>{item.org}</Text>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.approve}>
                <Text style={styles.btnText}>Одобрить</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.reject}>
                <Text style={styles.btnText}>Отклонить</Text>
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

  event: { fontWeight: '600', marginBottom: 4 },
  org: { color: '#666' },

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
  },

  btnText: { color: '#fff' }
});
