import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { shadows } from '../../theme/shadows';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}
export default function PrimaryButton({ title, onPress }) {
  return (
    <Pressable style={styles.btn} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.accent,
    paddingVertical: 14,
    borderRadius: radius.lg,
    alignItems: 'center',
    ...shadows.soft
  },

  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  outlineButton: {
  backgroundColor: 'transparent',
  borderWidth: 1,
  borderColor: colors.accent,
},
outlineText: {
  color: colors.accent,
}});
