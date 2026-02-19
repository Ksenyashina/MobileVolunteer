import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DashboardStackParamList } from '../navigation/stacks/DashboardStack';
import Page from '../components/layout/Page';
import BurgerMenu from '../navigation/tabs/BurgerMenu';
import AboutModal from '../components/modals/AboutModal';
import RulesModal from '../components/modals/RulesModal';
import ContactsModal from '../components/modals/ContactsModal';
import StatsModal from '../components/modals/StatsModal';
import { LineChart } from 'react-native-chart-kit';

import { typography } from '../theme/typography';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<DashboardStackParamList, 'Dashboard'>;
};

export default function DashboardScreen({ navigation }: Props) {
  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  const [rulesModalVisible, setRulesModalVisible] = useState(false);
  const [contactsModalVisible, setContactsModalVisible] = useState(false);
  const [statsModalVisible, setStatsModalVisible] = useState(false);

  // Данные для графика
  const chartData = {
    labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
    datasets: [
      {
        data: [4, 6, 8, 5, 7, 9],
        color: (opacity = 1) => `rgba(211, 154, 106, ${opacity})`,
        strokeWidth: 2
      }
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(211, 154, 106, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(102, 102, 102, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#d39a6a',
    },
  };

  return (
    <Page>
      <LinearGradient
        colors={['#fff9f5', '#fff0e8']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Хедер с бургер-меню */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.logo}>Личный кабинет</Text>
            <BurgerMenu
              navigation={navigation}
              userEmail="Ksenya421@mail.ru"
              onAboutPress={() => setAboutModalVisible(true)}
              onRulesPress={() => setRulesModalVisible(true)}
              onContactsPress={() => setContactsModalVisible(true)}
              onStatsPress={() => setStatsModalVisible(true)}
            />
          </View>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Приветствие с иконкой настроек */}
          <View style={styles.welcomeRow}>
            <View>
              <Text style={styles.welcomeTitle}>Добро пожаловать!</Text>
              <Text style={styles.welcomeName}>Ксения Сеняшина</Text>
            </View>
            <TouchableOpacity
              style={styles.settingsIconButton}
              onPress={() => navigation.navigate('ProfileSettings')}
            >
              <Ionicons name="settings-outline" size={24} color="#d39a6a" />
            </TouchableOpacity>
          </View>

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

          {/* График активности */}
          <View style={styles.chartSection}>
            <Text style={styles.sectionTitle}>Активность</Text>
            <View style={styles.chartContainer}>
              <LineChart
                data={chartData}
                width={width - 64}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
                formatYLabel={(value) => value}
                yAxisLabel=""
                yAxisSuffix=""
                fromZero
              />
            </View>
          </View>

          {/* Недавние мероприятия */}
          <View style={styles.recentSection}>
            <Text style={styles.sectionTitle}>Недавние мероприятия</Text>
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={40} color="#d39a6a" />
              <Text style={styles.emptyStateText}>У вас пока нет мероприятий</Text>
              <TouchableOpacity
                style={styles.browseButton}
                onPress={() => navigation.getParent()?.navigate('Events')}
              >
                <Text style={styles.browseButtonText}>Посмотреть мероприятия</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    marginBottom: 4,
  },
  logo: {
    ...typography.h2,
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  welcomeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  welcomeTitle: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 14,
  },
  welcomeName: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 2,
  },
  settingsIconButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 46,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0e0d0',
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
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0e0d0',
    shadowColor: '#d39a6a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
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
    lineHeight: 18,
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
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#f0e0d0',
    shadowColor: '#d39a6a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  recentSection: {
    marginBottom: 30,
  },
  emptyState: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0e0d0',
    shadowColor: '#d39a6a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyStateText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: 12,
    marginBottom: 16,
  },
  browseButton: {
    backgroundColor: '#d39a6a',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});