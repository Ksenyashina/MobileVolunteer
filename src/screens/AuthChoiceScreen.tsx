import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Page from '../components/layout/Page';
import PrimaryButton from '../components/ui/PrimaryButton';
import { colors } from '../theme/colors';

export default function AuthChoiceScreen({ navigation }) {
  return (
    <Page>
      <LinearGradient
        colors={['#fff9f5', '#fff0e8']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.container}>
          <View style={styles.card}>
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
        </View>
      </LinearGradient>
    </Page>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 32,
    borderRadius: 24,
    shadowColor: '#d39a6a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f5e5d5',
  },
  header: {
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 10,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 20,
  },
  backLink: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  backLinkText: {
    fontSize: 14,
    color: colors.accent,
    fontWeight: '500',
  },
});