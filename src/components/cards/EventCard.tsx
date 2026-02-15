import { View, Text, StyleSheet, Image } from 'react-native';
import { typography } from '../../theme/typography';
import { colors } from '../../theme/colors';

interface Props {
  title: string;
  date: string;
  location: string;
  spots: number;
  onPress?: () => void;
}
export default function EventCard({ title, image }) {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: 140
  },
  title: {
    padding: 12,
    ...typography.body,
    color: colors.textPrimary
  }
});
