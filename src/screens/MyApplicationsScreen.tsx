import { View, Text, StyleSheet, FlatList } from 'react-native';
import Page from '../components/layout/Page';
import { colors } from '../theme/colors';

const applications = [
  {
    id: '1',
    event: 'Экологическая акция',
    status: 'На рассмотрении',
    date: '12.03.2025'
  },
  {
    id: '2',
    event: 'Помощь приюту',
    status: 'Одобрено',
    date: '05.03.2025'
  }
];

export default function MyApplicationsScreen() {
  return (
    <Page>
      <Text style={styles.title}>Мои заявки</Text>

      <FlatList
        data={applications}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>

            <Text style={styles.event}>{item.event}</Text>

            <Text style={styles.meta}>
              Дата: {item.date}
            </Text>

            <Text
              style={[
                styles.status,
                item.status === 'Одобрено'
                  ? styles.approved
                  : styles.pending
              ]}
            >
              {item.status}
            </Text>

          </View>
        )}
      />
    </Page>
  );
}

const styles = StyleSheet.create({

  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20
  },

  card: {
    backgroundColor: colors.surface,
    padding: 18,
    borderRadius: 12,
    marginBottom: 12
  },

  event: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6
  },

  meta: {
    color: colors.textSecondary,
    marginBottom: 6
  },

  status: {
    fontWeight: '600'
  },

  approved: {
    color: '#2E7D32'
  },

  pending: {
    color: '#F57C00'
  }

});
