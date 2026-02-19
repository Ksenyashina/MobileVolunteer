import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Page from '../components/layout/Page';
import PrimaryButton from '../components/ui/PrimaryButton';
import { typography } from '../theme/typography';
import { radius } from '../theme/radius';
import { colors } from '../theme/colors';
import { useFormValidation, validationRules } from '../hooks/useFormValidation';

export default function LoginScreen({ navigation }) {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
  } = useFormValidation(
    { email: '', password: '' },
    validationRules.login
  );

  const handleLogin = () => {
    if (validateForm()) {
      // Здесь будет логика входа
      navigation.navigate('Auth', {
        screen: 'VerifyCode',
        params: { email: values.email }
      });
    } else {
      Alert.alert('Ошибка', 'Пожалуйста, исправьте ошибки в форме');
    }
  };

  return (
    <Page>
      <LinearGradient
        colors={['#fff9f5', '#fff0e8']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.card}>
              <View style={styles.iconContainer}>
                <Ionicons name="heart-outline" size={60} color="#d39a6a" />
              </View>

              <Text style={styles.title}>Волонтёрская Платформа</Text>
              <Text style={styles.subtitle}>Войдите в свой аккаунт</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={[styles.input, touched.email && errors.email ? styles.inputError : null]}
                  value={values.email}
                  onChangeText={(text) => handleChange('email', text)}
                  onBlur={() => handleBlur('email')}
                />
                {touched.email && errors.email ? (
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Пароль"
                  placeholderTextColor="#999"
                  secureTextEntry
                  style={[styles.input, touched.password && errors.password ? styles.inputError : null]}
                  value={values.password}
                  onChangeText={(text) => handleChange('password', text)}
                  onBlur={() => handleBlur('password')}
                />
                {touched.password && errors.password ? (
                  <Text style={styles.errorText}>{errors.password}</Text>
                ) : null}
              </View>

              <PrimaryButton
                title="Войти"
                onPress={handleLogin}
                style={styles.loginButton}
              />

              <TouchableOpacity
                onPress={() => navigation.navigate('Auth', { screen: 'Register' })}
                style={styles.registerLink}
              >
                <Text style={styles.linkText}>Нет аккаунта? Зарегистрироваться</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  card: {
    backgroundColor: '#fff',
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
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#f9f9f9',
    padding: 18,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#f0e0d0',
    fontSize: 16,
    color: '#333',
  },
  inputError: {
    borderColor: '#ff6b6b',
    borderWidth: 2,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  loginButton: {
    marginTop: 24,
    marginBottom: 16,
  },
  registerLink: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  linkText: {
    ...typography.body,
    color: '#d39a6a',
    fontSize: 15,
    fontWeight: '500',
  },
});