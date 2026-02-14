import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Page from '../components/layout/Page';
import { colors } from '../theme/colors';

export default function VerifyCodeScreen({ navigation }) {
  return (
    <Page>
      <View style={styles.card}>

        <Text style={styles.title}>Проверьте почту</Text>
        <Text style={styles.subtitle}>
          Мы отправили код подтверждения на вашу почту
        </Text>

        <Text style={styles.timer}>Код действителен: 4:57</Text>

        <TextInput
          placeholder="Введите код"
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.primaryText}>Подтвердить</Text>
        </TouchableOpacity>

      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 120,
    backgroundColor: colors.surface,
    padding: 24,
    borderRadius: 16
  },

  title: { fontSize: 22, fontWeight: '700', marginBottom: 6 },
  subtitle: { color: colors.textSecondary, marginBottom: 16 },
  timer: { marginBottom: 16 },

  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16
  },

  primaryBtn: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center'
  },

  primaryText: { color: '#fff', fontWeight: '600' }
});
