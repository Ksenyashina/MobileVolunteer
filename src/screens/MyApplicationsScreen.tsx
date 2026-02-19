import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert
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

// Типы для заявок
interface Application {
  id: string;
  event: string;
  location: string;
  date: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
}

const applications: Application[] = [
  {
    id: '1',
    event: 'Волонтеры-медики в МОДКТОБ',
    location: 'г Москва, Поперечный просек, д 3 стр 1',
    date: '1 декабря 2025',
    submittedDate: '12 декабря 2025, 10:29',
    status: 'approved',
  },
  {
    id: '2',
    event: 'Экологическая акция в парке',
    location: 'Санкт-Петербург, Парк 300-летия',
    date: '15 декабря 2025',
    submittedDate: '10 декабря 2025, 15:20',
    status: 'pending',
  },
  {
    id: '3',
    event: 'Помощь приюту для животных',
    location: 'Казань, Приют "Надежда"',
    date: '20 декабря 2025',
    submittedDate: '5 декабря 2025, 09:15',
    status: 'rejected',
  },
  {
    id: '4',
    event: 'Спортивный марафон',
    location: 'Екатеринбург, Центральный стадион',
    date: '25 декабря 2025',
    submittedDate: '1 декабря 2025, 11:40',
    status: 'approved',
  },
  {
    id: '5',
    event: 'Мастер-класс для детей',
    location: 'Санкт-Петербург, Арт-центр',
    date: '11 декабря 2025',
    submittedDate: '1 декабря 2025, 09:15',
    status: 'pending',
  },
];

const statusFilters = ['Все статусы', 'На рассмотрении', 'Одобрено', 'Отклонено', 'Отменена'];

const getStatusBadge = (status: string) => {
  switch(status) {
    case 'pending':
      return (
        <View style={[styles.statusBadge, styles.pendingBadge]}>
          <Text style={styles.pendingText}>На рассмотрении</Text>
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
    case 'cancelled':
      return (
        <View style={[styles.statusBadge, styles.cancelledBadge]}>
          <Ionicons name="close" size={14} color="#999" />
          <Text style={styles.cancelledText}> Отменена</Text>
        </View>
      );
    default:
      return null;
  }
};

export default function MyApplicationsScreen({ navigation }) {
  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  const [rulesModalVisible, setRulesModalVisible] = useState(false);
  const [contactsModalVisible, setContactsModalVisible] = useState(false);
  const [statsModalVisible, setStatsModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Все статусы');
  const [tempSelectedStatus, setTempSelectedStatus] = useState('Все статусы');
  const [applicationsList, setApplicationsList] = useState<Application[]>(applications);

  const openFilterModal = () => {
    setTempSelectedStatus(selectedStatus);
    setFilterModalVisible(true);
  };

  const applyFilters = () => {
    setSelectedStatus(tempSelectedStatus);
    setFilterModalVisible(false);
  };

  const getStatusFromFilter = (filter: string) => {
    switch(filter) {
      case 'На рассмотрении': return 'pending';
      case 'Одобрено': return 'approved';
      case 'Отклонено': return 'rejected';
      case 'Отменена': return 'cancelled';
      default: return null;
    }
  };

  const filteredApplications = applicationsList.filter(app => {
    const matchesSearch = app.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.location.toLowerCase().includes(searchQuery.toLowerCase());

    const statusFilter = getStatusFromFilter(selectedStatus);
    const matchesStatus = selectedStatus === 'Все статусы' || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const openCancelConfirm = (application: Application) => {
    setSelectedApplication(application);
    setConfirmModalVisible(true);
  };

  const handleCancelApplication = () => {
    if (!selectedApplication) return;

    setIsLoading(true);

    // Имитация запроса к серверу
    setTimeout(() => {
      // Обновляем статус заявки в списке
      const updatedApplications = applicationsList.map(app =>
        app.id === selectedApplication.id
          ? { ...app, status: 'cancelled' as const }
          : app
      );

      setApplicationsList(updatedApplications);
      setConfirmModalVisible(false);
      setSelectedApplication(null);
      setIsLoading(false);

      // Показываем уведомление об успехе
      Alert.alert('Успешно', 'Заявка отменена');
    }, 1000);
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
            <Text style={styles.headerTitle}>Мои заявки</Text>
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

        <View style={styles.content}>
          {/* Подзаголовок */}
          <Text style={styles.subtitle}>Управление заявками на мероприятия</Text>

          {/* Строка поиска и фильтр */}
          <View style={styles.searchRow}>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search-outline" size={20} color="#d39a6a" />
              <TextInput
                style={styles.searchInput}
                placeholder="Поиск по названию или городу"
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <TouchableOpacity
              style={[styles.filterButton, selectedStatus !== 'Все статусы' && styles.filterButtonActive]}
              onPress={openFilterModal}
            >
              <Ionicons
                name="options-outline"
                size={24}
                color={selectedStatus !== 'Все статусы' ? '#fff' : '#d39a6a'}
              />
            </TouchableOpacity>
          </View>

          {/* Активный фильтр */}
          {selectedStatus !== 'Все статусы' && (
            <View style={styles.activeFilterRow}>
              <Text style={styles.activeFilterText}>
                Фильтр: {selectedStatus}
              </Text>
              <TouchableOpacity onPress={() => setSelectedStatus('Все статусы')}>
                <Ionicons name="close-circle" size={20} color="#d39a6a" />
              </TouchableOpacity>
            </View>
          )}

          {/* Список заявок */}
          <FlatList
            data={filteredApplications}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.eventTitle}>{item.event}</Text>
                  {getStatusBadge(item.status)}
                </View>

                <View style={styles.eventDetails}>
                  <View style={styles.detailRow}>
                    <Ionicons name="calendar-outline" size={16} color="#d39a6a" />
                    <Text style={styles.detailText}> {item.date}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Ionicons name="location-outline" size={16} color="#d39a6a" />
                    <Text style={styles.detailText}> {item.location}</Text>
                  </View>
                </View>

                <View style={styles.submittedRow}>
                  <Ionicons name="time-outline" size={14} color="#999" />
                  <Text style={styles.submittedText}> Подпись: {item.submittedDate}</Text>
                </View>

                {/* Кнопка отмены только для заявок со статусом "на рассмотрении" */}
                {item.status === 'pending' && (
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => openCancelConfirm(item)}
                  >
                    <Text style={styles.cancelButtonText}>Отменить заявку</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Ionicons name="document-text-outline" size={60} color="#d39a6a" />
                <Text style={styles.emptyStateText}>Заявки не найдены</Text>
              </View>
            }
          />
        </View>

        {/* Модальное окно фильтра статусов */}
        <Modal
          visible={filterModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setFilterModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Выберите статус</Text>
                <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                  <Ionicons name="close" size={24} color="#d39a6a" />
                </TouchableOpacity>
              </View>

              <View style={styles.modalBody}>
                {statusFilters.map((status) => (
                  <TouchableOpacity
                    key={status}
                    style={[
                      styles.statusOption,
                      tempSelectedStatus === status && styles.statusOptionSelected
                    ]}
                    onPress={() => setTempSelectedStatus(status)}
                  >
                    <Text style={[
                      styles.statusOptionText,
                      tempSelectedStatus === status && styles.statusOptionTextSelected
                    ]}>
                      {status}
                    </Text>
                    {tempSelectedStatus === status && (
                      <Ionicons name="checkmark" size={20} color="#fff" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={styles.modalApplyButton}
                  onPress={applyFilters}
                >
                  <Text style={styles.modalApplyText}>Применить</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Модальное окно подтверждения отмены */}
        <Modal
          visible={confirmModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setConfirmModalVisible(false)}
        >
          <View style={styles.confirmOverlay}>
            <View style={styles.confirmContent}>
              <View style={styles.confirmHeader}>
                <Ionicons name="alert-circle-outline" size={40} color="#d39a6a" />
                <Text style={styles.confirmTitle}>Отменить заявку?</Text>
              </View>

              <Text style={styles.confirmMessage}>
                Вы уверены, что хотите отменить заявку на мероприятие{'\n'}
                <Text style={styles.confirmEventName}>"{selectedApplication?.event}"</Text>?
              </Text>

              <Text style={styles.confirmWarning}>
                Это действие нельзя отменить.
              </Text>

              <View style={styles.confirmButtons}>
                <TouchableOpacity
                  style={styles.confirmCancelButton}
                  onPress={() => setConfirmModalVisible(false)}
                  disabled={isLoading}
                >
                  <Text style={styles.confirmCancelText}>Назад</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.confirmSubmitButton, isLoading && styles.confirmButtonDisabled]}
                  onPress={handleCancelApplication}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Text style={styles.confirmSubmitText}>Отмена...</Text>
                  ) : (
                    <Text style={styles.confirmSubmitText}>Отменить заявку</Text>
                  )}
                </TouchableOpacity>
              </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 16,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0e0d0',
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: '#333',
    marginLeft: 8,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0e0d0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#d39a6a',
    borderColor: '#d39a6a',
  },
  activeFilterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  activeFilterText: {
    ...typography.body,
    color: '#d39a6a',
    fontSize: 13,
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
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
  cardHeader: {
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
  eventDetails: {
    marginBottom: 8,
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
  submittedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0e0d0',
  },
  submittedText: {
    ...typography.caption,
    color: '#999',
    fontSize: 12,
    marginLeft: 4,
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
  cancelledBadge: {
    backgroundColor: '#f0f0f0',
  },
  cancelledText: {
    color: '#999',
    fontSize: 12,
    fontWeight: '500',
  },
  cancelButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ff6b6b',
    alignSelf: 'flex-start',
  },
  cancelButtonText: {
    color: '#ff6b6b',
    fontSize: 13,
    fontWeight: '500',
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
  // Модальное окно фильтра
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0e0d0',
  },
  modalTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  modalBody: {
    padding: 16,
  },
  statusOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#f0e0d0',
  },
  statusOptionSelected: {
    backgroundColor: '#d39a6a',
    borderColor: '#d39a6a',
  },
  statusOptionText: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 15,
  },
  statusOptionTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0e0d0',
  },
  modalApplyButton: {
    backgroundColor: '#d39a6a',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: radius.lg,
  },
  modalApplyText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  // Модальное окно подтверждения
  confirmOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  confirmContent: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 340,
  },
  confirmHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  confirmTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '600',
    marginTop: 8,
  },
  confirmMessage: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 22,
  },
  confirmEventName: {
    fontWeight: '600',
    color: colors.textPrimary,
  },
  confirmWarning: {
    ...typography.caption,
    color: '#ff6b6b',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 24,
  },
  confirmButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  confirmCancelButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#f0e0d0',
    backgroundColor: '#fff',
  },
  confirmCancelText: {
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: '500',
  },
  confirmSubmitButton: {
    flex: 1,
    backgroundColor: '#ff6b6b',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: radius.lg,
  },
  confirmButtonDisabled: {
    opacity: 0.5,
  },
  confirmSubmitText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});