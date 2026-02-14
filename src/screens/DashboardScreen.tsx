import { View, Text, StyleSheet } from 'react-native';
import Page from '../components/layout/Page';
import { colors } from '../theme/colors';

export default function DashboardScreen() {
  return (
    <Page>

      <Text style={styles.title}>Личный кабинет</Text>
      <Text style={styles.subtitle}>Добро пожаловать!</Text>

      <View style={styles.row}>
        <Stat title="Мероприятий" value="0" />
        <Stat title="Организовано" value="0" />
      </View>

      <View style={styles.row}>
        <Stat title="Рейтинг" value="N/A" />
        <Stat title="Отзывы" value="0" />
      </View>

    </Page>
  );
}

function Stat({ title, value }) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { marginBottom: 20, color: colors.textSecondary },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },

  card: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: 18,
    borderRadius: 12,
    marginRight: 10
  },

  value: { fontSize: 20, fontWeight: '700' }
});
