import { View, Text, StyleSheet } from 'react-native';
import { typography } from '../../theme/typography';
import { colors } from '../../theme/colors';

export default function StatCard({ number, label }) {
  return (
    <View style={styles.statsGrid}>

  <View style={styles.statCard}>
    <Text style={styles.statIcon}>👤</Text>
    <Text style={styles.statNumber}>10k+</Text>
    <Text style={styles.statLabel}>Активных волонтёров</Text>
  </View>

  <View style={styles.statCard}>
    <Text style={styles.statIcon}>📅</Text>
    <Text style={styles.statNumber}>500+</Text>
    <Text style={styles.statLabel}>Успешных мероприятий</Text>
  </View>

  <View style={styles.statCard}>
    <Text style={styles.statIcon}>📍</Text>
    <Text style={styles.statNumber}>50+</Text>
    <Text style={styles.statLabel}>Городов присутствия</Text>
  </View>

  <View style={styles.statCard}>
    <Text style={styles.statIcon}>🏆</Text>
    <Text style={styles.statNumber}>100+</Text>
    <Text style={styles.statLabel}>Партнёров платформы</Text>
  </View>

</View>

  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    width: '48%'
  },
  number: {
    ...typography.h2,
    color: colors.accent
  },
  label: {
    ...typography.body,
    color: colors.textSecondary
  },
  statsGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
},

statCard: {
  width: '48%',
  backgroundColor: '#ffffff',
  borderRadius: 18,
  padding: 20,
  marginBottom: 12,
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#eee',
},

statIcon: {
  fontSize: 26,
  marginBottom: 10,
},

statNumber: {
  fontSize: 22,
  fontWeight: '700',
  color: '#d39a6a',
},

statLabel: {
  color: '#777',
  textAlign: 'center',
},

});
