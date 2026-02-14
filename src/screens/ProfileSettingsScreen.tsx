import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Page from '../components/layout/Page';
import { colors } from '../theme/colors';

export default function ProfileSettingsScreen() {
  return (
    <Page>

      <Text style={styles.title}>Профиль</Text>

      <TextInput placeholder="Имя" style={styles.input} />
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Город" style={styles.input} />

      <TouchableOpacity style={styles.saveBtn}>
        <Text style={{ color: '#fff' }}>Сохранить изменения</Text>
      </TouchableOpacity>

    </Page>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '700', marginBottom: 20 },

  input: {
    backgroundColor: colors.surface,
    padding: 14,
    borderRadius: 10,
    marginBottom: 12
  },

  saveBtn: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center'
  }
});
