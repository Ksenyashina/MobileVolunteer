import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Page from '../components/layout/Page';
import { colors } from '../theme/colors';

export default function AdminScreen({ navigation }) {
  return (
    <Page>

      <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={styles.title}>Администрирование</Text>

        {/* статистика */}
        <View style={styles.row}>
          <Stat label="Пользователи" value="128" />
          <Stat label="Мероприятия" value="42" />
        </View>

        <View style={styles.row}>
          <Stat label="Заявки" value="86" />
          <Stat label="Активные" value="19" />
        </View>

        {/* действия */}
        <Text style={styles.section}>Управление</Text>

        <AdminButton
          title="Мероприятия"
          onPress={() => navigation.navigate('AdminEvents')}
        />

        <AdminButton
          title="Заявки"
          onPress={() => navigation.navigate('AdminApplications')}
        />

        <AdminButton
          title="Пользователи"
          onPress={() => navigation.navigate('AdminUsers')}
        />

      </ScrollView>

    </Page>
  );
}

function Stat({ label, value }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text>{label}</Text>
    </View>
  );
}

function AdminButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20
  },

  section: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 10
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },

  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: 18,
    borderRadius: 12,
    marginRight: 10
  },

  statValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4
  },

  button: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 10
  },

  buttonText: {
    fontWeight: '600'
  }

});
