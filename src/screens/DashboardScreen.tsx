import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import BurgerMenu from '../navigation/tabs/BurgerMenu';
import AboutModal from '../components/modals/AboutModal';
import RulesModal from '../components/modals/RulesModal';
import ContactsModal from '../components/modals/ContactsModal';
import StatsModal from '../components/modals/StatsModal';

import { typography } from '../theme/typography';
import { colors } from '../theme/colors';

export default function DashboardScreen({ navigation }) {
  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  const [rulesModalVisible, setRulesModalVisible] = useState(false);
  const [contactsModalVisible, setContactsModalVisible] = useState(false);
  const [statsModalVisible, setStatsModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Хедер с бургер-меню */}
     <SafeAreaView style={styles.headerSafeArea}>
  <View style={styles.header}>
    <View style={styles.headerTop}>
      <Text style={styles.logo}>Личный кабинет</Text>
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
</SafeAreaView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.welcomeSubtitle}>Добро пожаловать, Ксения Сеняшина!</Text>

        {/* Статистика */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Мероприятий посещено</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Организовано</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>N/A</Text>
            <Text style={styles.statLabel}>Средний рейтинг</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Отзывов получено</Text>
          </View>
        </View>

        {/* Кнопка настроек */}
        <TouchableOpacity
  style={styles.settingsButton}
  onPress={() => navigation.navigate('ProfileSettings')}
>
  <Text style={styles.settingsButtonText}>Настройки профиля →</Text>
</TouchableOpacity>

        {/* График активности */}
        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Активность</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.placeholderText}>График активности</Text>
          </View>
        </View>
      </ScrollView>

      {/* Модальные окна */}
      <AboutModal visible={aboutModalVisible} onClose={() => setAboutModalVisible(false)} />
      <RulesModal visible={rulesModalVisible} onClose={() => setRulesModalVisible(false)} />
      <ContactsModal visible={contactsModalVisible} onClose={() => setContactsModalVisible(false)} />
      <StatsModal visible={statsModalVisible} onClose={() => setStatsModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerSafeArea: {
    backgroundColor: '#FFFFFF',
  },
  hheader: {
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
  headerTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  welcomeSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 16,
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  statNumber: {
    ...typography.h2,
    color: '#d39a6a',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
  },
  settingsButton: {
    alignSelf: 'flex-start',
    marginBottom: 24,
    paddingVertical: 8,
  },
  settingsButtonText: {
    ...typography.body,
    color: '#d39a6a',
    fontSize: 14,
    fontWeight: '500',
  },
  chartSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  chartPlaceholder: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  placeholderText: {
    ...typography.body,
    color: colors.textSecondary,
  },
});