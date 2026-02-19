import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Image
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

const tags = [
  'Экология', 'Спорт', 'Культура', 'Образование',
  'Животные', 'Дети', 'Помощь пожилым', 'IT',
  'Медицина', 'Урбанистика', 'Благотворительность', 'Искусство', 'Наука'
];

const events = [
  {
    id: '1',
    title: 'Tech for Good 2025',
    location: 'Москва, Экспоцентр',
    date: '18.12.2025',
    spots: 20,
    spotsLeft: 0,
    tags: ['Образование', 'IT', 'Наука'],
    status: 'pending', // 'pending', 'approved', 'rejected'
    image: require('../../assets/event1.png')
  },
  {
    id: '2',
    title: 'Зеленый Город: Посадка деревьев',
    location: 'Санкт-Петербург, Парк 300-летия',
    date: '23.12.2025',
    spots: 30,
    spotsLeft: 0,
    tags: ['Экология', 'Урбанистика', 'Благотворительность'],
    status: 'approved',
    image: require('../../assets/event2.png')
  },
  {
    id: '3',
    title: 'День открытых дверей в приюте',
    location: 'Казань, Приют "Надежда"',
    date: '18.12.2025',
    spots: 10,
    spotsLeft: 10,
    tags: ['Животные', 'Дети'],
    status: 'pending',
    image: require('../../assets/event1.png')
  },
  {
    id: '4',
    title: 'Спортивный марафон',
    location: 'Екатеринбург, Центральный стадион',
    date: '25.12.2025',
    spots: 50,
    spotsLeft: 25,
    tags: ['Спорт', 'Благотворительность'],
    status: 'approved',
    image: require('../../assets/event2.png')
  }
];

const getStatusBadge = (status: string) => {
  switch(status) {
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

export default function EventsScreen({ navigation }) {
  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  const [rulesModalVisible, setRulesModalVisible] = useState(false);
  const [contactsModalVisible, setContactsModalVisible] = useState(false);
  const [statsModalVisible, setStatsModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cityQuery, setCityQuery] = useState('');

  // Временные значения для фильтра (пока модалка открыта)
  const [tempSelectedTags, setTempSelectedTags] = useState<string[]>([]);
  const [tempSearchQuery, setTempSearchQuery] = useState('');
  const [tempCityQuery, setTempCityQuery] = useState('');

  const openFilterModal = () => {
    setTempSelectedTags(selectedTags);
    setTempSearchQuery(searchQuery);
    setTempCityQuery(cityQuery);
    setFilterModalVisible(true);
  };

  const applyFilters = () => {
    setSelectedTags(tempSelectedTags);
    setSearchQuery(tempSearchQuery);
    setCityQuery(tempCityQuery);
    setFilterModalVisible(false);
  };

  const clearFilters = () => {
    setTempSelectedTags([]);
    setTempSearchQuery('');
    setTempCityQuery('');
  };

  const resetFilters = () => {
    setSelectedTags([]);
    setSearchQuery('');
    setCityQuery('');
    setFilterModalVisible(false);
  };

  const toggleTag = (tag: string) => {
    if (tempSelectedTags.includes(tag)) {
      setTempSelectedTags(tempSelectedTags.filter(t => t !== tag));
    } else {
      setTempSelectedTags([...tempSelectedTags, tag]);
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = cityQuery === '' || event.location.toLowerCase().includes(cityQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 ||
                       event.tags.some(tag => selectedTags.includes(tag));

    return matchesSearch && matchesCity && matchesTags;
  });

  const activeFiltersCount = (selectedTags.length > 0 ? 1 : 0) +
                            (searchQuery ? 1 : 0) +
                            (cityQuery ? 1 : 0);

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
            <Text style={styles.headerTitle}>Мероприятия</Text>
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

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.subtitle}>Найдите подходящее мероприятие</Text>

          {/* Строка поиска и кнопка фильтра */}
          <View style={styles.searchRow}>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search-outline" size={20} color="#d39a6a" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Поиск..."
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <TouchableOpacity
              style={[styles.filterButton, activeFiltersCount > 0 && styles.filterButtonActive]}
              onPress={openFilterModal}
            >
              <Ionicons
                name="options-outline"
                size={24}
                color={activeFiltersCount > 0 ? '#fff' : '#d39a6a'}
              />
              {activeFiltersCount > 0 && (
                <View style={styles.filterBadge}>
                  <Text style={styles.filterBadgeText}>{activeFiltersCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Активные фильтры (если есть) */}
          {activeFiltersCount > 0 && (
            <View style={styles.activeFiltersRow}>
              <Text style={styles.activeFiltersText}>
                Активные фильтры:
              </Text>
              <TouchableOpacity onPress={resetFilters}>
                <Text style={styles.clearFiltersText}>Сбросить</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Результаты */}
          <View style={styles.resultsSection}>
            <Text style={styles.resultsCount}>
              Найдено мероприятий: {filteredEvents.length}
            </Text>

            {filteredEvents.map((event) => (
              <TouchableOpacity
                key={event.id}
                style={styles.eventCard}
                onPress={() => navigation.navigate('App', {
  screen: 'EventsStack',
  params: {
    screen: 'EventDetails',
    params: { event }
  }
})}
                activeOpacity={0.7}
              >
                <View style={styles.eventCardInner}>
                  <Image source={event.image} style={styles.eventImage} />

                  <View style={styles.eventContent}>
                    <View style={styles.eventHeader}>
                      <Text style={styles.eventTitle}>{event.title}</Text>
                      {getStatusBadge(event.status)}
                    </View>

                    <View style={styles.eventLocation}>
                      <Ionicons name="location-outline" size={14} color="#d39a6a" />
                      <Text style={styles.eventLocationText}> {event.location}</Text>
                    </View>

                    <View style={styles.eventDate}>
                      <Ionicons name="calendar-outline" size={14} color="#d39a6a" />
                      <Text style={styles.eventDateText}> {event.date}</Text>
                    </View>

                    <View style={styles.eventSpots}>
                      <Ionicons name="people-outline" size={14} color="#d39a6a" />
                      <Text style={styles.eventSpotsText}> {event.spotsLeft}/{event.spots}</Text>
                    </View>

                    <View style={styles.eventTags}>
                      {event.tags.map((tag) => (
                        <View key={tag} style={styles.eventTag}>
                          <Text style={styles.eventTagText}>{tag}</Text>
                        </View>
                      ))}
                    </View>

                    <View style={styles.eventFooter}>
                      <TouchableOpacity
                        style={styles.detailsButton}
                        onPress={() => navigation.navigate('App', {
  screen: 'EventsStack',
  params: {
    screen: 'EventDetails',
    params: { event }
  }
})}
                      >
                        <Text style={styles.detailsButtonText}>Подробнее →</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Модальное окно фильтров */}
        <Modal
          visible={filterModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setFilterModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Фильтры</Text>
                <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                  <Ionicons name="close" size={24} color="#d39a6a" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalBody}>
                {/* Поиск */}
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionLabel}>Поиск</Text>
                  <View style={styles.modalSearchInputContainer}>
                    <Ionicons name="search-outline" size={20} color="#d39a6a" />
                    <TextInput
                      style={styles.modalSearchInput}
                      placeholder="Название или город..."
                      placeholderTextColor="#999"
                      value={tempSearchQuery}
                      onChangeText={setTempSearchQuery}
                    />
                  </View>
                </View>

                {/* Город */}
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionLabel}>Город</Text>
                  <View style={styles.modalSearchInputContainer}>
                    <Ionicons name="location-outline" size={20} color="#d39a6a" />
                    <TextInput
                      style={styles.modalSearchInput}
                      placeholder="Например: Москва"
                      placeholderTextColor="#999"
                      value={tempCityQuery}
                      onChangeText={setTempCityQuery}
                    />
                  </View>
                </View>

                {/* Теги */}
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionLabel}>Теги</Text>
                  <View style={styles.modalTagsContainer}>
                    {tags.map((tag) => (
                      <TouchableOpacity
                        key={tag}
                        style={[
                          styles.modalTag,
                          tempSelectedTags.includes(tag) && styles.modalTagSelected
                        ]}
                        onPress={() => toggleTag(tag)}
                      >
                        <Text style={[
                          styles.modalTagText,
                          tempSelectedTags.includes(tag) && styles.modalTagTextSelected
                        ]}>
                          {tag}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </ScrollView>

              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={styles.modalClearButton}
                  onPress={clearFilters}
                >
                  <Text style={styles.modalClearText}>Сбросить</Text>
                </TouchableOpacity>
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
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: '#333',
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
    position: 'relative',
  },
  filterButtonActive: {
    backgroundColor: '#d39a6a',
    borderColor: '#d39a6a',
  },
  filterBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ff6b6b',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeFiltersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  activeFiltersText: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 13,
  },
  clearFiltersText: {
    ...typography.body,
    color: '#d39a6a',
    fontSize: 13,
    fontWeight: '500',
  },
  resultsSection: {
    marginTop: 8,
  },
  resultsCount: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 16,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f0e0d0',
    shadowColor: '#d39a6a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  eventCardInner: {
    flexDirection: 'row',
  },
  eventImage: {
    width: 100,
    height: '100%',
    backgroundColor: '#f5e5d5',
  },
  eventContent: {
    flex: 1,
    padding: 12,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  pendingBadge: {
    backgroundColor: '#fff0e8',
  },
  pendingText: {
    color: '#d39a6a',
    fontSize: 10,
    fontWeight: '500',
  },
  approvedBadge: {
    backgroundColor: '#e8f5e9',
  },
  approvedText: {
    color: '#4CAF50',
    fontSize: 10,
    fontWeight: '500',
  },
  rejectedBadge: {
    backgroundColor: '#ffebee',
  },
  rejectedText: {
    color: '#ff6b6b',
    fontSize: 10,
    fontWeight: '500',
  },
  eventLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  eventLocationText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
  },
  eventDate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  eventDateText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
  },
  eventSpots: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventSpotsText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
  },
  eventTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
    gap: 4,
  },
  eventTag: {
    backgroundColor: '#fff0e8',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  eventTagText: {
    ...typography.caption,
    color: '#d39a6a',
    fontSize: 10,
    fontWeight: '500',
  },
  eventFooter: {
    alignItems: 'flex-end',
  },
  detailsButton: {
    backgroundColor: '#d39a6a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  // Модальное окно
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
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
    fontSize: 20,
    fontWeight: '600',
  },
  modalBody: {
    padding: 20,
  },
  modalSection: {
    marginBottom: 24,
  },
  modalSectionLabel: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  modalSearchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0e0d0',
    paddingHorizontal: 12,
  },
  modalSearchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: '#333',
    marginLeft: 8,
  },
  modalTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  modalTag: {
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#f0e0d0',
    marginRight: 8,
    marginBottom: 8,
  },
  modalTagSelected: {
    backgroundColor: '#d39a6a',
    borderColor: '#d39a6a',
  },
  modalTagText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 14,
  },
  modalTagTextSelected: {
    color: '#fff',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0e0d0',
    gap: 12,
  },
  modalClearButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0e0d0',
    backgroundColor: '#fff',
  },
  modalClearText: {
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: '500',
  },
  modalApplyButton: {
    flex: 1,
    backgroundColor: '#d39a6a',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
  },
  modalApplyText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});