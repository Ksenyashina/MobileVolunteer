import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { typography } from '../../theme/typography';
import { colors } from '../../theme/colors';

interface Props {
  number: string;
  title: string;
  description: string;
  accentColor: string;
}
export default function RuleCard({
  icon,
  title,
  description,
  accent
}) {
  return (
    <View style={[styles.card, { borderLeftColor: accent }]}>
      <MaterialIcons name={icon} size={26} color={accent} />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 14,
    borderLeftWidth: 4,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3
  },

  title: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    marginTop: 6
  },

  description: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: 4
  }
});
