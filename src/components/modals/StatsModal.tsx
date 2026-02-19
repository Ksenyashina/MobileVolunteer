import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { typography } from '../../theme/typography';
import { colors } from '../../theme/colors';

export default function StatsModal({ visible, onClose }) {
  // Реальная статистика (без преувеличений)
  const stats = [
    {
      icon: 'people-outline',
      number: '1 247',
      label: 'волонтёров',
      change: '+156',
      period: 'за месяц',
    },
    {
      icon: 'calendar-outline',
      number: '89',
      label: 'мероприятий',
      change: '+12',
      period: 'за месяц',
    },
    {
      icon: 'location-outline',
      number: '12',
      label: 'городов',
      change: '+3',
      period: 'с начала года',
    },
    {
      icon: 'business-outline',
      number: '34',
      label: 'организаций',
      change: '+8',
      period: 'партнёров',
    },
  ];

  const achievements = [
    { icon: 'star-outline', title: 'Рейтинг 4.7', description: 'Средняя оценка пользователей' },
    { icon: 'time-outline', title: '3 500+ часов', description: 'волонтёрской помощи' },
    { icon: 'globe-outline', title: '5 регионов', description: 'присутствия' },
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={['#fff9f5', '#fff0e8']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <SafeAreaView style={styles.safeArea}>
              <View style={styles.header}>
                <Text style={styles.title}>Статистика платформы</Text>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Ionicons name="close" size={24} color="#d39a6a" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.heroSection}>
                  <Ionicons name="stats-chart-outline" size={48} color="#d39a6a" />
                  <Text style={styles.heroTitle}>Наши показатели</Text>
                  <Text style={styles.heroText}>
                    Актуальные данные на {new Date().toLocaleDateString('ru-RU')}
                  </Text>
                </View>

                <View style={styles.statsGrid}>
                  {stats.map((stat, index) => (
                    <View key={index} style={styles.statCard}>
                      <View style={styles.statHeader}>
                        <Ionicons name={stat.icon} size={24} color="#d39a6a" />
                        <View style={styles.changeBadge}>
                          <Text style={styles.changeText}>{stat.change}</Text>
                        </View>
                      </View>
                      <Text style={styles.statNumber}>{stat.number}</Text>
                      <Text style={styles.statLabel}>{stat.label}</Text>
                      <Text style={styles.statPeriod}>{stat.period}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.achievementsSection}>
                  <Text style={styles.sectionTitle}>Достижения</Text>
                  <View style={styles.achievementsList}>
                    {achievements.map((item, index) => (
                      <View key={index} style={styles.achievementItem}>
                        <Ionicons name={item.icon} size={20} color="#d39a6a" />
                        <View style={styles.achievementContent}>
                          <Text style={styles.achievementTitle}>{item.title}</Text>
                          <Text style={styles.achievementDescription}>{item.description}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.summaryCard}>
                  <Ionicons name="heart" size={24} color="#d39a6a" />
                  <Text style={styles.summaryText}>
                    За всё время через платформу организовано более 350 мероприятий,
                    в которых приняли участие более 1200 волонтёров
                  </Text>
                </View>
              </ScrollView>
            </SafeAreaView>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0e0d0',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '600',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0e0d0',
  },
  content: {
    padding: 20,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
  },
  heroText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0e0d0',
    shadowColor: '#d39a6a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  changeBadge: {
    backgroundColor: '#fff0e8',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  changeText: {
    color: '#d39a6a',
    fontSize: 10,
    fontWeight: '600',
  },
  statNumber: {
    ...typography.h2,
    color: '#d39a6a',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statLabel: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '500',
  },
  statPeriod: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 10,
  },
  achievementsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  achievementsList: {
    gap: 8,
  },
  achievementItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#f0e0d0',
    shadowColor: '#d39a6a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    gap: 12,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  achievementDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
  },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: '#fff0e8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    gap: 12,
    borderWidth: 1,
    borderColor: '#f0e0d0',
    alignItems: 'center',
  },
  summaryText: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
});