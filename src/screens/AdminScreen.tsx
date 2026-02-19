import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Page from '../components/layout/Page';
import BurgerMenu from '../navigation/tabs/BurgerMenu';
import AboutModal from '../components/modals/AboutModal';
import RulesModal from '../components/modals/RulesModal';
import ContactsModal from '../components/modals/ContactsModal';
import StatsModal from '../components/modals/StatsModal';
import { typography } from '../theme/typography';
import { colors } from '../theme/colors';
import { radius } from '../theme/radius';

export default function AdminScreen({ navigation }) {
  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  const [rulesModalVisible, setRulesModalVisible] = useState(false);
  const [contactsModalVisible, setContactsModalVisible] = useState(false);
  const [statsModalVisible, setStatsModalVisible] = useState(false);

  // Статистика для админ-панели
  const stats = [
    { label: 'Пользователи', value: '128', icon: 'people-outline' },
    { label: 'Мероприятия', value: '42', icon: 'calendar-outline' },
    { label: 'Заявки', value: '86', icon: 'document-text-outline' },
    { label: 'Активные', value: '19', icon: 'flash-outline' },
  ];

  return (
    <Page>
      <LinearGradient
        colors={['#fff9f5', '#fff0e8']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Хедер - только название и бургер-меню */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.headerTitle}>Админ-панель</Text>
            <BurgerMenu
              navigation={navigation}
              userEmail="admin@volunteer.ru"
              onAboutPress={() => setAboutModalVisible(true)}
              onRulesPress={() => setRulesModalVisible(true)}
              onContactsPress={() => setContactsModalVisible(true)}
              onStatsPress={() => setStatsModalVisible(true)}
            />
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Статистика */}
          <Text style={styles.sectionTitle}>Общая статистика</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={styles.statIconContainer}>
                  <Ionicons name={stat.icon} size={24} color="#d39a6a" />
                </View>
                <View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Управление */}
          <Text style={styles.sectionTitle}>Управление</Text>

          <TouchableOpacity
            style={styles.navCard}
            onPress={() => navigation.navigate('AdminEventsModeration')}
          >
            <View style={styles.navCardLeft}>
              <View style={styles.navIconContainer}>
                <Ionicons name="calendar-outline" size={24} color="#d39a6a" />
              </View>
              <View>
                <Text style={styles.navCardTitle}>Мероприятия</Text>
                <Text style={styles.navCardSubtitle}>Модерация и управление</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#d39a6a" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navCard}
            onPress={() => navigation.navigate('AdminUsers')}
          >
            <View style={styles.navCardLeft}>
              <View style={styles.navIconContainer}>
                <Ionicons name="people-outline" size={24} color="#d39a6a" />
              </View>
              <View>
                <Text style={styles.navCardTitle}>Пользователи</Text>
                <Text style={styles.navCardSubtitle}>Управление ролями</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#d39a6a" />
          </TouchableOpacity>
        </ScrollView>

        {/* Модальные окна */}
        <AboutModal visible={aboutModalVisible} onClose={() => setAboutModalVisible(false)} />
        <RulesModal visible={rulesModalVisible} onClose={() => setRulesModalVisible(false)} />
        <ContactsModal visible={contactsModalVisible} onClose={() => setContactsModalVisible(false)} />
        <StatsModal visible={statsModalVisible} onClose={() => setStatsModalVisible(false)} />
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
  header: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fae1d6',
    borderRadius: 30,
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
  headerTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0e0d0',
    shadowColor: '#d39a6a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    gap: 12,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff0e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
  },
  navCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#f0e0d0',
    shadowColor: '#d39a6a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  navCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  navIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff0e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navCardTitle: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  navCardSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
  },
});