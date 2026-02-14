import { View, Text, StyleSheet } from 'react-native';
import { typography } from '../../theme/typography';
import { colors } from '../../theme/colors';

export default function StatCard({ number, label }) {
  return (
    <View style={styles.card}>
      <Text style={styles.number}>{number}</Text>
      <Text style={styles.label}>{label}</Text>
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
  }
});
