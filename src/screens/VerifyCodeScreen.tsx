import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { radius } from '../theme/radius';

export default function VerifyCodeScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#fff9f5', '#fff0e8']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons name="mail-outline" size={80} color="#d39a6a" />
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Проверьте почту</Text>
          <Text style={styles.subtitle}>
            Мы отправили код подтверждения на вашу почту
          </Text>

          <View style={styles.timerContainer}>
            <Text style={styles.timerLabel}>Код действителен:</Text>
            <Text style={styles.timerValue}>4:57</Text>
          </View>

          <TextInput
            placeholder="Введите код"
            placeholderTextColor="#999"
            keyboardType="number-pad"
            maxLength={6}
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => navigation.replace('App')}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryText}>Подтвердить</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={styles.secondaryText}>Изменить данные</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
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
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#d39a6a',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#fff0e8',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignSelf: 'center',
  },
  timerLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 6,
  },
  timerValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#d39a6a',
  },
  input: {
    backgroundColor: '#f9f9f9',
    padding: 18,
    borderRadius: radius.lg,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f0e0d0',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 4,
    color: '#333',
  },
  primaryBtn: {
    backgroundColor: '#d39a6a',
    padding: 18,
    borderRadius: radius.lg,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryBtn: {
    padding: 16,
    alignItems: 'center',
  },
  secondaryText: {
    color: '#d39a6a',
    fontSize: 15,
    fontWeight: '500',
  },
});