import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Page from '../components/layout/Page';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function RegisterScreen({ navigation }) {
  return (
    <Page>
      <View style={styles.center}>

        <Text style={styles.title}>Волонтёрская Платформа</Text>
        <Text style={styles.subtitle}>
          Профессиональная платформа для организации волонтёрской деятельности
        </Text>

        <TextInput placeholder="Имя" style={styles.input} />
        <TextInput placeholder="Email" style={styles.input} />
        <TextInput placeholder="Пароль" secureTextEntry style={styles.input} />

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() =>
  navigation.navigate('Auth', {
    screen: 'VerifyCode'
  })
}
        >
          <Text style={styles.primaryText}>Регистрация</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Auth', {
  screen: 'Login'
})}>
          <Text style={styles.link}>Вход</Text>
        </TouchableOpacity>

      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center' },

  title: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: 10
  },

  subtitle: {
    ...typography.body,
    marginBottom: 30,
    color: colors.textSecondary
  },

  input: {
    backgroundColor: colors.surface,
    padding: 14,
    borderRadius: 10,
    marginBottom: 12
  },

  primaryBtn: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10
  },

  primaryText: { color: '#fff', fontWeight: '600' },

  link: {
    textAlign: 'center',
    marginTop: 14,
    color: colors.primary
  }
});
