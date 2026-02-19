import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Page from '../components/layout/Page';
import { typography } from '../theme/typography';
import { colors } from '../theme/colors';
import { radius } from '../theme/radius';

export default function EventDetailsScreen({ navigation, route }) {
  const { event } = route.params;
  const [applicationText, setApplicationText] = useState('');

  const handleSubmitApplication = () => {
    Alert.alert(
      'Заявка отправлена',
      'Ваша заявка на участие отправлена организатору',
      [{
        text: 'OK',
        onPress: () => {
          navigation.navigate('EventsStack', {
      screen: 'EventsList',
    })
        }
      }]
    );
  };

  const getStatusBadge = () => {
    switch(event.status) {
      case 'pending':
        return (
          <View style={[styles.statusBadge, styles.pendingBadge]}>
            <Text style={styles.pendingText}>На проверке</Text>
          </View>
        );
      case 'approved':
        return (
          <View style={[styles.statusBadge, styles.approvedBadge]}>
            <Ionicons name="checkmark-circle" size={14} color="#4CAF50" />
            <Text style={styles.approvedText}> Одобрено</Text>
          </View>
        );
      case 'rejected':
        return (
          <View style={[styles.statusBadge, styles.rejectedBadge]}>
            <Ionicons name="close-circle" size={14} color="#ff6b6b" />
            <Text style={styles.rejectedText}> Отклонено</Text>
          </View>
        );
      default:
        return null;
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
        {/* Хедер с кнопкой назад */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate('EventsStack', {
      screen: 'EventsList',
    })}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#d39a6a" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Детали мероприятия</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Заголовок */}
          <Text style={styles.title}>{event.title}</Text>

          {/* Картинка мероприятия */}
          <Image source={event.image} style={styles.eventImage} resizeMode="cover" />

          {/* Информация */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="calendar-outline" size={20} color="#d39a6a" />
              <Text style={styles.infoText}> {event.date} 14:36</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={20} color="#d39a6a" />
              <Text style={styles.infoText}> {event.location}</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="people-outline" size={20} color="#d39a6a" />
              <Text style={styles.infoText}> Требуется: {event.spots} волонтёров</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="person-outline" size={20} color="#d39a6a" />
              <Text style={styles.infoText}> Осталось мест: {event.spotsLeft}</Text>
            </View>

            <View style={styles.statusWrapper}>
              {getStatusBadge()}
            </View>
          </View>

          {/* Описание */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Описание</Text>
            <Text style={styles.description}>
              {event.description || 'Описание отсутствует'}
            </Text>
          </View>

          {/* Теги */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Теги</Text>
            <View style={styles.tagsContainer}>
              {event.tags.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Форма заявки */}
          <View style={styles.applicationSection}>
            <Text style={styles.sectionTitle}>Сопроводительное сообщение</Text>
            <Text style={styles.applicationSubtitle}>(необязательно)</Text>

            <TextInput
              style={styles.applicationInput}
              placeholder="Расскажите о себе и почему хотите участвовать..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={applicationText}
              onChangeText={setApplicationText}
            />

            <View style={styles.applicationButtons}>
              <TouchableOpacity
  style={styles.cancelButton}
  onPress={() => navigation.navigate('EventsStack', {
    screen: 'EventsList',
  })}
>
  <Text style={styles.cancelButtonText}>Отмена</Text>
</TouchableOpacity>

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmitApplication}
              >
                <Text style={styles.submitButtonText}>Подать заявку</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0e0d0',
    backgroundColor: 'transparent',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 16,
  },
  eventImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: '#f5e5d5',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f0e0d0',
    shadowColor: '#d39a6a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 15,
    marginLeft: 8,
  },
  statusWrapper: {
    marginTop: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  pendingBadge: {
    backgroundColor: '#fff0e8',
  },
  pendingText: {
    color: '#d39a6a',
    fontSize: 13,
    fontWeight: '500',
  },
  approvedBadge: {
    backgroundColor: '#e8f5e9',
  },
  approvedText: {
    color: '#4CAF50',
    fontSize: 13,
    fontWeight: '500',
  },
  rejectedBadge: {
    backgroundColor: '#ffebee',
  },
  rejectedText: {
    color: '#ff6b6b',
    fontSize: 13,
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#fff0e8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    color: '#d39a6a',
    fontSize: 13,
    fontWeight: '500',
  },
  applicationSection: {
    marginBottom: 30,
  },
  applicationSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: 12,
  },
  applicationInput: {
    backgroundColor: '#fff',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#f0e0d0',
    padding: 16,
    fontSize: 15,
    color: '#333',
    minHeight: 120,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  applicationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#f0e0d0',
    backgroundColor: '#fff',
  },
  cancelButtonText: {
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: '500',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#d39a6a',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: radius.lg,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});