import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Page from '../components/layout/Page';

export default function AdminOverviewScreen({ navigation }) {
  return (
    <Page>

      <Text style={styles.title}>Обзор системы</Text>

      <View style={styles.row}>
        <Stat label="Пользователи" value="128" />
        <Stat label="Организации" value="12" />
      </View>

      <View style={styles.row}>
        <Stat label="Мероприятия" value="42" />
        <Stat label="На модерации" value="6" />
      </View>

      <Text style={styles.section}>Управление</Text>

      <Action
        title="Модерация мероприятий"
        onPress={() => navigation.navigate('AdminEventsModeration')}
      />

      <Action
        title="Пользователи"
        onPress={() => navigation.navigate('AdminUsers')}
      />

    </Page>
  );
}

function Stat({ label, value }) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text>{label}</Text>
    </View>
  );
}

function Action({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.action} onPress={onPress}>
      <Text style={styles.actionText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: '700', marginBottom: 20 },
  section: { fontSize: 18, fontWeight: '600', marginTop: 10, marginBottom: 10 },

  row: {
    flexDirection: 'row',
    marginBottom: 12
  },

  card: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    padding: 18,
    borderRadius: 12,
    marginRight: 10
  },

  value: { fontSize: 20, fontWeight: '700' },

  action: {
    backgroundColor: '#f3f3f3',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10
  },

  actionText: { fontWeight: '600' }
});
