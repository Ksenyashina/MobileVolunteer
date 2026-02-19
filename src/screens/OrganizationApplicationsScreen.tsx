import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
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

// Типы данных
interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  volunteersNeeded: number;
  volunteersApplied: number;
  status: 'pending' | 'approved' | 'rejected';
  description?: string;
  image?: string;
  endDate?: string;
}

interface Application {
  id: string;
  userName: string;
  userEmail: string;
  eventId: string;
  eventTitle: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
}

// Мок-данные для мероприятий
const myEvents: Event[] = [
  {
    id: '1',
    title: 'Волонтеры-медики в МОДКТОБ',
    date: '01.12.2025',
    time: '10:00',
    location: 'г Москва, Поперечный просек, д 3 стр 1',
    volunteersNeeded: 20,
    volunteersApplied: 12,
    status: 'pending',
    description: 'Помощь медицинскому персоналу в проведении мероприятий',
    endDate: '01.01.2026 18:00',
  },
  {
    id: '2',
    title: 'Экологическая акция в парке',
    date: '15.12.2025',
    time: '11:00',
    location: 'Санкт-Петербург, Парк 300-летия',
    volunteersNeeded: 30,
    volunteersApplied: 12,
    status: 'approved',
    description: 'Уборка территории и посадка деревьев',
  },
  {
    id: '3',
    title: 'Помощь приюту для животных',
    date: '20.12.2025',
    time: '14:00',
    location: 'Казань, Приют "Надежда"',
    volunteersNeeded: 10,
    volunteersApplied: 5,
    status: 'approved',
    description: 'Выгул собак и уход за животными',
  },
];

// Генерация 10 заявок для мероприятия с id = '1'
const generateApplications = (): Application[] => {
  const applicants = [
    { name: 'Артур Смелый', email: 'artur.smeliy@mail.ru' },
    { name: 'Анна Иванова', email: 'anna.ivanova@mail.ru' },
    { name: 'Петр Сидоров', email: 'petr.sidorov@mail.ru' },
    { name: 'Мария Петрова', email: 'maria.petrova@mail.ru' },
    { name: 'Дмитрий Волков', email: 'dmitry.volkov@mail.ru' },
    { name: 'Елена Соколова', email: 'elena.sokolova@mail.ru' },
    { name: 'Алексей Морозов', email: 'aleksey.morozov@mail.ru' },
    { name: 'Ольга Новикова', email: 'olga.novikova@mail.ru' },
    { name: 'Сергей Лебедев', email: 'sergey.lebedev@mail.ru' },
    { name: 'Наталья Козлова', email: 'natalya.kozlova@mail.ru' },
  ];

  const statuses: Array<'pending' | 'approved' | 'rejected'> = ['pending', 'approved', 'rejected'];
  const applications: Application[] = [];

  // Создаем 12 заявок для мероприятия с id = '1'
  for (let i = 0; i < 12; i++) {
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomDay = Math.floor(Math.random() * 28) + 1;
    const applicant = applicants[i % applicants.length];

    applications.push({
      id: `101${i + 1}`,
      userName: applicant.name,
      userEmail: applicant.email,
      eventId: '1',
      eventTitle: 'Волонтеры-медики в МОДКТОБ',
      status: randomStatus,
      submittedDate: `${randomDay.toString().padStart(2, '0')}.11.2025`,
    });
  }

  // Заявки для других мероприятий
  applications.push(
    {
      id: '201',
      userName: 'Анна Иванова',
      userEmail: 'anna.ivanova@mail.ru',
      eventId: '2',
      eventTitle: 'Экологическая акция в парке',
      status: 'pending',
      submittedDate: '03.11.2025',
    },
    {
      id: '202',
      userName: 'Петр Сидоров',
      userEmail: 'petr.sidorov@mail.ru',
      eventId: '2',
      eventTitle: 'Экологическая акция в парке',
      status: 'approved',
      submittedDate: '04.11.2025',
    },
    {
      id: '203',
      userName: 'Мария Петрова',
      userEmail: 'maria.petrova@mail.ru',
      eventId: '2',
      eventTitle: 'Экологическая акция в парке',
      status: 'rejected',
      submittedDate: '05.11.2025',
    },
    {
      id: '301',
      userName: 'Дмитрий Волков',
      userEmail: 'dmitry.volkov@mail.ru',
      eventId: '3',
      eventTitle: 'Помощь приюту для животных',
      status: 'pending',
      submittedDate: '06.11.2025',
    },
    {
      id: '302',
      userName: 'Елена Соколова',
      userEmail: 'elena.sokolova@mail.ru',
      eventId: '3',
      eventTitle: 'Помощь приюту для животных',
      status: 'approved',
      submittedDate: '07.11.2025',
    }
  );

  return applications;
};

const applications = generateApplications();

const getStatusBadge = (status: string) => {
  switch (status) {
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

export default function OrganizationApplicationsScreen({ navigation }) {
  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  const [rulesModalVisible, setRulesModalVisible] = useState(false);
  const [contactsModalVisible, setContactsModalVisible] = useState(false);
  const [statsModalVisible, setStatsModalVisible] = useState(false);
  const [createEventModalVisible, setCreateEventModalVisible] = useState(false);
  const [editEventModalVisible, setEditEventModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [eventApplications, setEventApplications] = useState<Application[]>([]);
  const [applicationsModalVisible, setApplicationsModalVisible] = useState(false);
  const [eventsList, setEventsList] = useState<Event[]>(myEvents);

  // Данные нового мероприятия (для формы)
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    volunteersNeeded: '',
    imageUrl: '',
  });

  // Данные для редактирования
  const [editEvent, setEditEvent] = useState({
    id: '',
    title: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    volunteersNeeded: '',
    imageUrl: '',
  });

  const handleCreateEvent = () => {
    Alert.alert('Успешно', 'Мероприятие создано');
    setCreateEventModalVisible(false);
    setNewEvent({
      title: '',
      description: '',
      location: '',
      startDate: '',
      endDate: '',
      volunteersNeeded: '',
      imageUrl: '',
    });
  };

  const handleEditEvent = (event: Event) => {
    setEditEvent({
      id: event.id,
      title: event.title,
      description: event.description || '',
      location: event.location,
      startDate: `${event.date} ${event.time}`,
      endDate: event.endDate || '',
      volunteersNeeded: event.volunteersNeeded.toString(),
      imageUrl: event.image || '',
    });
    setEditEventModalVisible(true);
  };

  const handleUpdateEvent = () => {
    Alert.alert('Успешно', 'Мероприятие обновлено');
    setEditEventModalVisible(false);
  };

  const handleDeleteEvent = (eventId: string, eventTitle: string) => {
    Alert.alert(
      'Удаление мероприятия',
      `Вы уверены, что хотите удалить мероприятие "${eventTitle}"?`,
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          onPress: () => {
            Alert.alert('Успешно', 'Мероприятие удалено');
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleViewApplications = (event: Event) => {
    const filtered = applications.filter((app) => app.eventId === event.id);
    setSelectedEvent(event);
    setEventApplications(filtered);
    setApplicationsModalVisible(true);
  };

  const handleApplicationAction = (application: Application, action: 'approve' | 'reject') => {
    Alert.alert(
      action === 'approve' ? 'Подтверждение' : 'Отклонение',
      `Вы уверены, что хотите ${action === 'approve' ? 'одобрить' : 'отклонить'} заявку ${application.userName}?`,
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: action === 'approve' ? 'Одобрить' : 'Отклонить',
          onPress: () => {
            Alert.alert('Успешно', `Заявка ${action === 'approve' ? 'одобрена' : 'отклонена'}`);
            setApplicationsModalVisible(false);
          },
          style: action === 'approve' ? 'default' : 'destructive',
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
        {/* Хедер */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.headerTitle}>Кабинет организатора</Text>
            <BurgerMenu
              navigation={navigation}
              userEmail="organizer@mail.ru"
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
          {/* Подзаголовок */}
          <Text style={styles.subtitle}>Управляйте своими мероприятиями и заявками</Text>

          {/* Кнопка создания мероприятия */}
          <TouchableOpacity style={styles.createButton} onPress={() => setCreateEventModalVisible(true)}>
            <LinearGradient colors={['#d39a6a', '#c48454']} style={styles.createButtonGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <Ionicons name="add-circle-outline" size={24} color="#fff" />
              <Text style={styles.createButtonText}>Создать мероприятие</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Список мероприятий организатора */}
          <Text style={styles.sectionTitle}>Мои мероприятия</Text>

          {eventsList.map((event) => {
            const appCount = applications.filter((app) => app.eventId === event.id).length;

            return (
              <View key={event.id} style={styles.eventCard}>
                <View style={styles.eventHeader}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  {getStatusBadge(event.status)}
                </View>

                <View style={styles.eventDateTime}>
                  <Ionicons name="calendar-outline" size={16} color="#d39a6a" />
                  <Text style={styles.eventDateTimeText}>
                    {' '}
                    {event.date} {event.time}
                  </Text>
                </View>

                <View style={styles.eventLocation}>
                  <Ionicons name="location-outline" size={16} color="#d39a6a" />
                  <Text style={styles.eventLocationText}> {event.location}</Text>
                </View>

                <View style={styles.eventVolunteers}>
                  <Ionicons name="people-outline" size={16} color="#d39a6a" />
                  <Text style={styles.eventVolunteersText}>
                    {' '}
                    {event.volunteersApplied} / {event.volunteersNeeded} волонтёров
                  </Text>
                </View>

                <View style={styles.eventActions}>
                  <TouchableOpacity style={styles.applicationsButton} onPress={() => handleViewApplications(event)}>
                    <Text style={styles.applicationsButtonText}>Заявки {appCount > 0 ? `(${appCount})` : ''}</Text>
                    <Ionicons name="chevron-forward" size={16} color="#fff" />
                  </TouchableOpacity>

                  {/* Кнопки редактирования и удаления только для pending статуса */}
                  {event.status === 'pending' && (
                    <View style={styles.editDeleteButtons}>
                      <TouchableOpacity style={styles.editButton} onPress={() => handleEditEvent(event)}>
                        <Ionicons name="create-outline" size={20} color="#d39a6a" />
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteEvent(event.id, event.title)}>
                        <Ionicons name="trash-outline" size={20} color="#ff6b6b" />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* Модальное окно создания мероприятия */}
        <Modal
          visible={createEventModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setCreateEventModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Создать мероприятие</Text>
                <TouchableOpacity onPress={() => setCreateEventModalVisible(false)}>
                  <Ionicons name="close" size={24} color="#d39a6a" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                <View style={styles.formField}>
                  <Text style={styles.formLabel}>Название</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Введите название мероприятия"
                    placeholderTextColor="#999"
                    value={newEvent.title}
                    onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
                  />
                </View>

                <View style={styles.formField}>
                  <Text style={styles.formLabel}>Описание</Text>
                  <TextInput
                    style={[styles.formInput, styles.textArea]}
                    placeholder="Опишите мероприятие"
                    placeholderTextColor="#999"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    value={newEvent.description}
                    onChangeText={(text) => setNewEvent({ ...newEvent, description: text })}
                  />
                </View>

                <View style={styles.formField}>
                  <Text style={styles.formLabel}>Ссылка на изображение (URL)</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="https://example.com/image.jpg"
                    placeholderTextColor="#999"
                    value={newEvent.imageUrl}
                    onChangeText={(text) => setNewEvent({ ...newEvent, imageUrl: text })}
                  />
                </View>

                <View style={styles.formField}>
                  <Text style={styles.formLabel}>Место проведения</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="г Москва, ул Примерная, д 1"
                    placeholderTextColor="#999"
                    value={newEvent.location}
                    onChangeText={(text) => setNewEvent({ ...newEvent, location: text })}
                  />
                </View>

                <View style={styles.formRow}>
                  <View style={[styles.formField, styles.formHalf]}>
                    <Text style={styles.formLabel}>Начало</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="01.12.2025 10:00"
                      placeholderTextColor="#999"
                      value={newEvent.startDate}
                      onChangeText={(text) => setNewEvent({ ...newEvent, startDate: text })}
                    />
                  </View>

                  <View style={[styles.formField, styles.formHalf]}>
                    <Text style={styles.formLabel}>Окончание</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="01.01.2026 18:00"
                      placeholderTextColor="#999"
                      value={newEvent.endDate}
                      onChangeText={(text) => setNewEvent({ ...newEvent, endDate: text })}
                    />
                  </View>
                </View>

                <View style={styles.formField}>
                  <Text style={styles.formLabel}>Требуется волонтёров</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="9"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    value={newEvent.volunteersNeeded}
                    onChangeText={(text) => setNewEvent({ ...newEvent, volunteersNeeded: text })}
                  />
                </View>
              </ScrollView>

              <View style={styles.modalFooter}>
                <TouchableOpacity style={styles.modalCancelButton} onPress={() => setCreateEventModalVisible(false)}>
                  <Text style={styles.modalCancelText}>Отмена</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalSubmitButton} onPress={handleCreateEvent}>
                  <Text style={styles.modalSubmitText}>Создать</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Модальное окно редактирования мероприятия */}
        <Modal
          visible={editEventModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setEditEventModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Редактировать мероприятие</Text>
                <TouchableOpacity onPress={() => setEditEventModalVisible(false)}>
                  <Ionicons name="close" size={24} color="#d39a6a" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                <View style={styles.formField}>
                  <Text style={styles.formLabel}>Название</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Введите название мероприятия"
                    placeholderTextColor="#999"
                    value={editEvent.title}
                    onChangeText={(text) => setEditEvent({ ...editEvent, title: text })}
                  />
                </View>

                <View style={styles.formField}>
                  <Text style={styles.formLabel}>Описание</Text>
                  <TextInput
                    style={[styles.formInput, styles.textArea]}
                    placeholder="Опишите мероприятие"
                    placeholderTextColor="#999"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    value={editEvent.description}
                    onChangeText={(text) => setEditEvent({ ...editEvent, description: text })}
                  />
                </View>

                <View style={styles.formField}>
                  <Text style={styles.formLabel}>Ссылка на изображение (URL)</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="https://example.com/image.jpg"
                    placeholderTextColor="#999"
                    value={editEvent.imageUrl}
                    onChangeText={(text) => setEditEvent({ ...editEvent, imageUrl: text })}
                  />
                </View>

                <View style={styles.formField}>
                  <Text style={styles.formLabel}>Место проведения</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="г Москва, ул Примерная, д 1"
                    placeholderTextColor="#999"
                    value={editEvent.location}
                    onChangeText={(text) => setEditEvent({ ...editEvent, location: text })}
                  />
                </View>

                <View style={styles.formRow}>
                  <View style={[styles.formField, styles.formHalf]}>
                    <Text style={styles.formLabel}>Начало</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="01.12.2025 10:00"
                      placeholderTextColor="#999"
                      value={editEvent.startDate}
                      onChangeText={(text) => setEditEvent({ ...editEvent, startDate: text })}
                    />
                  </View>

                  <View style={[styles.formField, styles.formHalf]}>
                    <Text style={styles.formLabel}>Окончание</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="01.01.2026 18:00"
                      placeholderTextColor="#999"
                      value={editEvent.endDate}
                      onChangeText={(text) => setEditEvent({ ...editEvent, endDate: text })}
                    />
                  </View>
                </View>

                <View style={styles.formField}>
                  <Text style={styles.formLabel}>Требуется волонтёров</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="9"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    value={editEvent.volunteersNeeded}
                    onChangeText={(text) => setEditEvent({ ...editEvent, volunteersNeeded: text })}
                  />
                </View>
              </ScrollView>

              <View style={styles.modalFooter}>
                <TouchableOpacity style={styles.modalCancelButton} onPress={() => setEditEventModalVisible(false)}>
                  <Text style={styles.modalCancelText}>Отмена</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalSubmitButton} onPress={handleUpdateEvent}>
                  <Text style={styles.modalSubmitText}>Сохранить</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Модальное окно заявок на мероприятие */}
        <Modal
          visible={applicationsModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setApplicationsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContainer, { maxHeight: '80%' }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { flex: 1 }]} numberOfLines={1} ellipsizeMode="tail">
                  Заявки: {selectedEvent?.title}
                </Text>
                <TouchableOpacity onPress={() => setApplicationsModalVisible(false)}>
                  <Ionicons name="close" size={24} color="#d39a6a" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                {eventApplications.length > 0 ? (
                  eventApplications.map((app) => (
                    <View key={app.id} style={styles.applicationCard}>
                      <View style={styles.applicationHeader}>
                        <View style={styles.applicationUserInfo}>
                          <Text style={styles.applicationName}>{app.userName}</Text>
                          <Text style={styles.applicationEmail}>{app.userEmail}</Text>
                        </View>
                        {getStatusBadge(app.status)}
                      </View>

                      <Text style={styles.applicationDate}>Подана: {app.submittedDate}</Text>

                      {app.status === 'pending' && (
                        <View style={styles.applicationActions}>
                          <TouchableOpacity
                            style={[styles.actionButton, styles.approveButton]}
                            onPress={() => handleApplicationAction(app, 'approve')}
                          >
                            <Ionicons name="checkmark" size={18} color="#4CAF50" />
                            <Text style={styles.approveButtonText}>Одобрить</Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={[styles.actionButton, styles.rejectButton]}
                            onPress={() => handleApplicationAction(app, 'reject')}
                          >
                            <Ionicons name="close" size={18} color="#ff6b6b" />
                            <Text style={styles.rejectButtonText}>Отклонить</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  ))
                ) : (
                  <View style={styles.emptyState}>
                    <Ionicons name="document-text-outline" size={60} color="#d39a6a" />
                    <Text style={styles.emptyStateText}>Нет заявок на это мероприятие</Text>
                  </View>
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>

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
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 20,
  },
  createButton: {
    marginBottom: 24,
  },
  createButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: radius.lg,
    gap: 8,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
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
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  eventTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  eventDateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventDateTimeText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 13,
    marginLeft: 4,
  },
  eventLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventLocationText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 13,
    marginLeft: 4,
  },
  eventVolunteers: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventVolunteersText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 13,
    marginLeft: 4,
  },
  eventActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  applicationsButton: {
    backgroundColor: '#d39a6a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  applicationsButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    marginRight: 4,
  },
  editDeleteButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    padding: 8,
    backgroundColor: '#fff0e8',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d39a6a',
  },
  deleteButton: {
    padding: 8,
    backgroundColor: '#ffebee',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ff6b6b',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  pendingBadge: {
    backgroundColor: '#fff0e8',
  },
  pendingText: {
    color: '#d39a6a',
    fontSize: 12,
    fontWeight: '500',
  },
  approvedBadge: {
    backgroundColor: '#e8f5e9',
  },
  approvedText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '500',
  },
  rejectedBadge: {
    backgroundColor: '#ffebee',
  },
  rejectedText: {
    color: '#ff6b6b',
    fontSize: 12,
    fontWeight: '500',
  },
  // Модальные окна
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0e0d0',
    backgroundColor: '#fff',
  },
  modalTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  modalBody: {
    maxHeight: 400,
    padding: 20,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0e0d0',
    gap: 12,
    backgroundColor: '#fff',
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#f0e0d0',
    backgroundColor: '#fff',
  },
  modalCancelText: {
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: '500',
  },
  modalSubmitButton: {
    flex: 1,
    backgroundColor: '#d39a6a',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: radius.lg,
  },
  modalSubmitText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  // Форма создания/редактирования мероприятия
  formField: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  formHalf: {
    flex: 1,
  },
  formLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  formInput: {
    backgroundColor: '#f9f9f9',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#f0e0d0',
    padding: 14,
    fontSize: 15,
    color: '#333',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  // Карточка заявки в модальном окне
  applicationCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0e0d0',
  },
  applicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  applicationUserInfo: {
    flex: 1,
    marginRight: 8,
  },
  applicationName: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  applicationEmail: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  applicationDate: {
    ...typography.caption,
    color: '#999',
    fontSize: 12,
    marginBottom: 12,
  },
  applicationActions: {
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
    borderWidth: 1,
    gap: 4,
  },
  approveButton: {
    borderColor: '#4CAF50',
    backgroundColor: '#fff',
  },
  approveButtonText: {
    color: '#4CAF50',
    fontSize: 13,
    fontWeight: '500',
  },
  rejectButton: {
    borderColor: '#ff6b6b',
    backgroundColor: '#fff',
  },
  rejectButtonText: {
    color: '#ff6b6b',
    fontSize: 13,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 15,
    marginTop: 12,
  },
});