import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Page from '../components/layout/Page';
import { typography } from '../theme/typography';
import { colors } from '../theme/colors';
import { radius } from '../theme/radius';

// Мок-данные для мероприятий на модерации
const pendingEvents = [
  {
    id: '1',
    title: 'Tech for Good 2025',
    location: 'Москва, Экспоцентр',
    date: '18 декабря 2025',
    volunteersNeeded: 20,
    organizer: 'IT Community',
    status: 'pending',
  },
  {
    id: '2',
    title: 'Зеленый Город: Посадка деревьев',
    location: 'Санкт-Петербург, Парк 300-летия',
    date: '23 декабря 2025',
    volunteersNeeded: 30,
    organizer: 'Экологическое движение',
    status: 'pending',
  },
  {
    id: '3',
    title: 'Помощь приюту для животных',
    location: 'Казань, Приют "Надежда"',
    date: '20 декабря 2025',
    volunteersNeeded: 10,
    organizer: 'Зоозащита',
    status: 'pending',
  },
];

export default function AdminEventsModerationScreen({ navigation }) {
  const [events, setEvents] = useState(pendingEvents);

  const handleApprove = (eventId: string) => {
    Alert.alert(
      'Подтверждение',
      'Вы уверены, что хотите одобрить это мероприятие?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Одобрить',
          onPress: () => {
            setEvents(events.filter(e => e.id !== eventId));
            Alert.alert('Успешно', 'Мероприятие одобрено');
          },
        },
      ]
    );
  };

  const handleReject = (eventId: string) => {
    Alert.alert(
      'Подтверждение',
      'Вы уверены, что хотите отклонить это мероприятие?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Отклонить',
          onPress: () => {
            setEvents(events.filter(e => e.id !== eventId));
            Alert.alert('Успешно', 'Мероприятие отклонено');
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <Page>
      <LinearGradient
        colors={['#fff9f5', '#fff0e8']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Хедер с кнопкой назад */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#d39a6a" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Мероприятия на модерации</Text>
          </View>
        </View>

        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.eventCard}>
              <Text style={styles.eventTitle}>{item.title}</Text>

              <View style={styles.eventDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="location-outline" size={16} color="#d39a6a" />
                  <Text style={styles.detailText}> {item.location}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Ionicons name="calendar-outline" size={16} color="#d39a6a" />
                  <Text style={styles.detailText}> {item.date}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Ionicons name="people-outline" size={16} color="#d39a6a" />
                  <Text style={styles.detailText}> Требуется: {item.volunteersNeeded} волонтёров</Text>
                </View>

                <View style={styles.detailRow}>
                  <Ionicons name="person-outline" size={16} color="#d39a6a" />
                  <Text style={styles.detailText}> Организатор: {item.organizer}</Text>
                </View>
              </View>

              <View style={styles.statusBadge}>
                <View style={styles.pendingBadge}>
                  <Text style={styles.pendingText}>На проверке</Text>
                </View>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.approveButton]}
                  onPress={() => handleApprove(item.id)}
                >
                  <Ionicons name="checkmark" size={18} color="#fff" />
                  <Text style={styles.actionButtonText}>Одобрить</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.rejectButton]}
                  onPress={() => handleReject(item.id)}
                >
                  <Ionicons name="close" size={18} color="#fff" />
                  <Text style={styles.actionButtonText}>Отклонить</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="checkmark-circle-outline" size={60} color="#d39a6a" />
              <Text style={styles.emptyStateText}>Нет мероприятий на рассмотрении</Text>
            </View>
          }
        />
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
    alignItems: 'center',
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0e0d0',
    shadowColor: '#d39a6a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  eventTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  eventDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 13,
    marginLeft: 4,
  },
  statusBadge: {
    marginBottom: 12,
  },
  pendingBadge: {
    backgroundColor: '#fff0e8',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  pendingText: {
    color: '#d39a6a',
    fontSize: 12,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 20,
    gap: 4,
  },
  approveButton: {
    backgroundColor: '#d39a6a',
  },
  rejectButton: {
    backgroundColor: '#ffb5a0',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 15,
    marginTop: 12,
  },
});