import {FlatList, Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import Page from '../components/layout/Page';
import BurgerMenu from "../navigation/tabs/BurgerMenu";
import {typography} from "../theme/typography";
import {colors} from "../theme/colors";

const data = [
  { id: '1', title: 'Помощь приюту' },
  { id: '2', title: 'Экологическая акция' }
];

export default function EventsScreen({ navigation }) {
  return (
    <Page>
                 {/* ХЕДЕР С БУРГЕР-МЕНЮ */}
<View style={styles.header}>
  <View style={styles.headerTop}>
    <Text style={styles.logo}>Мероприятия</Text>
    <BurgerMenu
      navigation={navigation}
      userEmail={null}
      onAboutPress={() => setAboutModalVisible(true)}
      onRulesPress={() => setRulesModalVisible(true)}
      onContactsPress={() => setContactsModalVisible(true)}
      onStatsPress={() => setStatsModalVisible(true)}
    />
  </View>
</View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('EventDetails', { event: item })}
          >
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </Page>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12
  },
    header: {
  marginHorizontal: 16,
  marginTop: 12,
  marginBottom: 24,
  paddingVertical: 12,
  paddingHorizontal: 16,
  backgroundColor: '#fae1d6', // персиковый
  borderRadius: 30,
  // тень
  shadowColor: '#d39a6a',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 8,
  elevation: 6,
  borderWidth: 1,
  borderColor: '#fae1d6',
},
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    ...typography.h2,
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: { fontSize: 16, fontWeight: '600' }
});
