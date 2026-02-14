import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Page from '../components/layout/Page';
import PrimaryButton from '../components/ui/PrimaryButton';
import { colors } from '../theme/colors';

export default function AuthChoiceScreen({ navigation }) {
  return (
    <Page>
      <View style={styles.container}>
        {/* Заголовок */}
        <View style={styles.header}>
          <Text style={styles.title}>Волонтёрская</Text>
          <Text style={styles.title}>Платформа</Text>
        </View>

        {/* Подзаголовок */}
        <Text style={styles.subtitle}>
          Профессиональная платформа для организации волонтёрской деятельности
        </Text>

        {/* Кнопки */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Регистрация →"
            onPress={() => navigation.navigate('Auth', { screen: 'Register' })}
            type="primary"
          />

          <PrimaryButton
            title="Вход →"
            onPress={() => navigation.navigate('Auth', { screen: 'Login' })}
            type="secondary"
          />
        </View>

        {/* Ссылка внизу */}
        <TouchableOpacity
          style={styles.backLink}
          onPress={() => navigation.navigate('Public')}
        >
          <Text style={styles.backLinkText}>Вернуться на главную</Text>
        </TouchableOpacity>
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 42,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 30,
  },
  backLink: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  backLinkText: {
    fontSize: 14,
    color: colors.accent,
    fontWeight: '500',
  },
});