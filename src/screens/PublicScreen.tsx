import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import Page from '../components/layout/Page';
import PrimaryButton from '../components/ui/PrimaryButton';
import BurgerMenu from '../navigation/tabs/BurgerMenu';
import AboutModal from '../components/modals/AboutModal';
import RulesModal from '../components/modals/RulesModal';
import ContactsModal from '../components/modals/ContactsModal';
import StatsModal from '../components/modals/StatsModal';

import { typography } from '../theme/typography';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');

export default function PublicScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  const [rulesModalVisible, setRulesModalVisible] = useState(false);
  const [contactsModalVisible, setContactsModalVisible] = useState(false);
  const [statsModalVisible, setStatsModalVisible] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <Page>
      <LinearGradient
        colors={['#fff9f5', '#fff0e8']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* ХЕДЕР С БУРГЕР-МЕНЮ */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.logo}>VolonterPlatform</Text>
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

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* HERO БЛОК */}
          <LinearGradient
            colors={['#ffffff', '#fff5f0']}
            style={styles.hero}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>Платформа нового поколения</Text>
            </View>

            <Text style={styles.heroTitle}>
              Технологии <Text style={styles.heroAccent}>добрых дел</Text>
            </Text>

            <Text style={styles.heroSubtitle}>
              Объединяем людей, ресурсы и технологии для решения социальных задач. Эффективная организация волонтёрской деятельности в цифровой среде.
            </Text>

            <View style={styles.heroButtons}>
              <LinearGradient
                colors={['#d39a6a', '#c48454']}
                style={styles.gradientButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <PrimaryButton
                  title="Присоединиться →"
                  onPress={() => navigation.navigate('Auth')}
                  style={styles.primaryButton}
                />
              </LinearGradient>

              <PrimaryButton
                title="Мероприятия"
                variant="outline"
                onPress={() =>
                  navigation.navigate('App', {
                    screen: 'EventsStack',
                    params: { screen: 'Events' }
                  })
                }
                style={styles.secondaryButton}
              />
            </View>
          </LinearGradient>

          {/* СТАТИСТИКА */}
          <View style={styles.statsGrid}>
            <LinearGradient
              colors={['#ffffff', '#fff5f0']}
              style={styles.statCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="people-outline" size={32} color="#d39a6a" />
              <Text style={styles.statNumber}>10k+</Text>
              <Text style={styles.statLabel}>Активных волонтёров</Text>
            </LinearGradient>

            <LinearGradient
              colors={['#ffffff', '#fff5f0']}
              style={styles.statCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="calendar-outline" size={32} color="#d39a6a" />
              <Text style={styles.statNumber}>500+</Text>
              <Text style={styles.statLabel}>Успешных мероприятий</Text>
            </LinearGradient>

            <LinearGradient
              colors={['#ffffff', '#fff5f0']}
              style={styles.statCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="location-outline" size={32} color="#d39a6a" />
              <Text style={styles.statNumber}>50+</Text>
              <Text style={styles.statLabel}>Городов присутствия</Text>
            </LinearGradient>

            <LinearGradient
              colors={['#ffffff', '#fff5f0']}
              style={styles.statCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="trophy-outline" size={32} color="#d39a6a" />
              <Text style={styles.statNumber}>100+</Text>
              <Text style={styles.statLabel}>Партнёров платформы</Text>
            </LinearGradient>
          </View>

          {/* О ПЛАТФОРМЕ */}
          <LinearGradient
            colors={['#ffffff', '#fff5f0']}
            style={styles.aboutWrapper}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.aboutTitle}>О платформе</Text>

            <Text style={styles.aboutDescription}>
              Мы создаем цифровую экосистему для развития волонтерства. Наша миссия — сделать помощь доступной, прозрачной и эффективной.
            </Text>

            <View style={styles.aboutFeatures}>
              <View style={styles.aboutFeatureItem}>
                <Ionicons name="shield-checkmark-outline" size={24} color="#d39a6a" />
                <View style={styles.aboutFeatureTexts}>
                  <Text style={styles.aboutFeatureTitle}>Надёжность</Text>
                  <Text style={styles.aboutFeatureDesc}>Верифицированные организаторы и волонтёры</Text>
                </View>
              </View>

              <View style={styles.aboutFeatureItem}>
                <Ionicons name="flash-outline" size={24} color="#d39a6a" />
                <View style={styles.aboutFeatureTexts}>
                  <Text style={styles.aboutFeatureTitle}>Эффективность</Text>
                  <Text style={styles.aboutFeatureDesc}>Умный подбор мероприятий по навыкам</Text>
                </View>
              </View>

              <View style={styles.aboutFeatureItem}>
                <Ionicons name="heart-outline" size={24} color="#d39a6a" />
                <View style={styles.aboutFeatureTexts}>
                  <Text style={styles.aboutFeatureTitle}>Сообщество</Text>
                  <Text style={styles.aboutFeatureDesc}>Поддержка культуры взаимопомощи</Text>
                </View>
              </View>
            </View>

            <Text style={styles.aboutTag}>Digital Volunteering</Text>
          </LinearGradient>

          {/* АКТУАЛЬНЫЕ СОБЫТИЯ */}
          <View style={styles.eventsHeader}>
            <View>
              <Text style={styles.eventsTitle}>Актуальные события</Text>
              <Text style={styles.eventsSubtitle}>
                Примите участие в значимых проектах
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('App', {
                screen: 'EventsStack',
                params: { screen: 'Events' }
              })}
              activeOpacity={0.7}
            >
              <Text style={styles.eventsAllLink}>Все →</Text>
            </TouchableOpacity>
          </View>

          {/* Вертикальный список событий */}
          <View style={styles.eventsList}>
            <LinearGradient
              colors={['#ffffff', '#fff5f0']}
              style={styles.eventListItem}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Image
                source={require('../../assets/event1.png')}
                style={styles.eventListImage}
                resizeMode="cover"
              />
              <View style={styles.eventListContent}>
                <Text style={styles.eventListTitle}>Мастер-класс для детей</Text>
                <View style={styles.eventListDetails}>
                  <View style={styles.eventDetailRow}>
                    <Ionicons name="calendar-outline" size={14} color="#d39a6a" />
                    <Text style={styles.eventListDate}> 11 декабря 2025</Text>
                  </View>
                  <View style={styles.eventDetailRow}>
                    <Ionicons name="location-outline" size={14} color="#d39a6a" />
                    <Text style={styles.eventListLocation}> Санкт-Петербург, Арт-центр</Text>
                  </View>
                </View>
                <View style={styles.eventListFooter}>
                  <Text style={styles.eventListSpots}>Нужно: 4</Text>
                  <LinearGradient
                    colors={['#d39a6a', '#c48454']}
                    style={styles.gradientSmallButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <TouchableOpacity
                      onPress={() => navigation.navigate('App', {
                        screen: 'EventsStack',
                        params: {
                          screen: 'EventDetails',
                          params: { id: '1' }
                        }
                      })}
                    >
                      <Text style={styles.eventListButtonText}>Подробнее</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </LinearGradient>

            <LinearGradient
              colors={['#ffffff', '#fff5f0']}
              style={styles.eventListItem}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Image
                source={require('../../assets/event2.png')}
                style={styles.eventListImage}
                resizeMode="cover"
              />
              <View style={styles.eventListContent}>
                <Text style={styles.eventListTitle}>Благотворительный забег</Text>
                <View style={styles.eventListDetails}>
                  <View style={styles.eventDetailRow}>
                    <Ionicons name="calendar-outline" size={14} color="#d39a6a" />
                    <Text style={styles.eventListDate}> 31 декабря 2025</Text>
                  </View>
                  <View style={styles.eventDetailRow}>
                    <Ionicons name="location-outline" size={14} color="#d39a6a" />
                    <Text style={styles.eventListLocation}> Москва, Лужники</Text>
                  </View>
                </View>
                <View style={styles.eventListFooter}>
                  <Text style={styles.eventListSpots}>Нужно: 99</Text>
                  <LinearGradient
                    colors={['#d39a6a', '#c48454']}
                    style={styles.gradientSmallButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <TouchableOpacity
                      onPress={() => navigation.navigate('App', {
                        screen: 'EventsStack',
                        params: {
                          screen: 'EventDetails',
                          params: { id: '2' }
                        }
                      })}
                    >
                      <Text style={styles.eventListButtonText}>Подробнее</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </LinearGradient>

            <LinearGradient
              colors={['#ffffff', '#fff5f0']}
              style={styles.eventListItem}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Image
                source={require('../../assets/event1.png')}
                style={styles.eventListImage}
                resizeMode="cover"
              />
              <View style={styles.eventListContent}>
                <Text style={styles.eventListTitle}>Футбольный матч</Text>
                <View style={styles.eventListDetails}>
                  <View style={styles.eventDetailRow}>
                    <Ionicons name="calendar-outline" size={14} color="#d39a6a" />
                    <Text style={styles.eventListDate}> 12 марта 2026</Text>
                  </View>
                  <View style={styles.eventDetailRow}>
                    <Ionicons name="location-outline" size={14} color="#d39a6a" />
                    <Text style={styles.eventListLocation}> г. Казань, Казань Арена</Text>
                  </View>
                </View>
                <View style={styles.eventListFooter}>
                  <Text style={styles.eventListSpots}>Нужно: 50</Text>
                  <LinearGradient
                    colors={['#d39a6a', '#c48454']}
                    style={styles.gradientSmallButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <TouchableOpacity
                      onPress={() => navigation.navigate('App', {
                        screen: 'EventsStack',
                        params: {
                          screen: 'EventDetails',
                          params: { id: '3' }
                        }
                      })}
                    >
                      <Text style={styles.eventListButtonText}>Подробнее</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* ПРАВИЛА СООБЩЕСТВА */}
          <Text style={styles.rulesMainTitle}>Правила сообщества</Text>

          <Animated.View style={{ opacity: fadeAnim }}>
            <View style={styles.rulesList}>
              <LinearGradient
                colors={['#ffffff', '#fff5f0']}
                style={styles.ruleItem}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.ruleHeader}>
                  <Ionicons name="heart-outline" size={24} color="#d39a6a" />
                  <Text style={styles.ruleItemNumber}> 01</Text>
                </View>
                <Text style={styles.ruleItemTitle}>Взаимоуважение</Text>
                <Text style={styles.ruleItemDescription}>
                  Мы ценим каждого участника и поддерживаем атмосферу доверия и уважения.
                </Text>
              </LinearGradient>

              <LinearGradient
                colors={['#ffffff', '#fff5f0']}
                style={styles.ruleItem}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.ruleHeader}>
                  <Ionicons name="checkmark-done-outline" size={24} color="#d39a6a" />
                  <Text style={styles.ruleItemNumber}> 02</Text>
                </View>
                <Text style={styles.ruleItemTitle}>Ответственность</Text>
                <Text style={styles.ruleItemDescription}>
                  Серьезный подход к взятым обязательствам — основа нашей работы.
                </Text>
              </LinearGradient>

              <LinearGradient
                colors={['#ffffff', '#fff5f0']}
                style={styles.ruleItem}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.ruleHeader}>
                  <Ionicons name="shield-outline" size={24} color="#d39a6a" />
                  <Text style={styles.ruleItemNumber}> 03</Text>
                </View>
                <Text style={styles.ruleItemTitle}>Безопасность</Text>
                <Text style={styles.ruleItemDescription}>
                  Мы строго следим за безопасностью данных и мероприятий.
                </Text>
              </LinearGradient>
            </View>
          </Animated.View>
        </ScrollView>

        {/* МОДАЛЬНЫЕ ОКНА */}
        <AboutModal
          visible={aboutModalVisible}
          onClose={() => setAboutModalVisible(false)}
        />
        <RulesModal
          visible={rulesModalVisible}
          onClose={() => setRulesModalVisible(false)}
        />
        <ContactsModal
          visible={contactsModalVisible}
          onClose={() => setContactsModalVisible(false)}
        />
        <StatsModal
          visible={statsModalVisible}
          onClose={() => setStatsModalVisible(false)}
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
  scrollContent: {
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  header: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 24,
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
  logo: {
    ...typography.h2,
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    borderRadius: 18,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0e0d0',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: '#d39a6a',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    color: '#777',
    textAlign: 'center',
  },
  hero: {
    alignItems: 'center',
    marginBottom: 32,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#f0e0d0',
  },
  heroBadge: {
    backgroundColor: 'rgba(211, 154, 106, 0.15)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
    marginBottom: 16,
  },
  heroBadgeText: {
    color: '#d39a6a',
    fontWeight: '600',
    fontSize: 14,
  },
  heroTitle: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 12,
    lineHeight: 38,
  },
  heroAccent: {
    color: '#d39a6a',
  },
  heroSubtitle: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },
  heroButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 16,
  },
  gradientButton: {
    flex: 1,
    borderRadius: 12,
  },
  primaryButton: {
    backgroundColor: 'transparent',
    width: '100%',
  },
  secondaryButton: {
    flex: 1,
  },
  aboutWrapper: {
    borderRadius: 20,
    padding: 20,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#f0e0d0',
    width: '100%',
  },
  aboutTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    fontSize: 22,
    marginBottom: 12,
  },
  aboutDescription: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
    width: '100%',
  },
  aboutFeatures: {
    gap: 20,
    marginBottom: 24,
    width: '100%',
  },
  aboutFeatureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    width: '100%',
  },
  aboutFeatureTexts: {
    flex: 1,
    flexShrink: 1,
  },
  aboutFeatureTitle: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  aboutFeatureDesc: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 18,
    flexWrap: 'wrap',
  },
  aboutTag: {
    ...typography.caption,
    color: '#d39a6a',
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  eventsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
  eventsTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    fontSize: 22,
    marginBottom: 4,
  },
  eventsSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 14,
  },
  eventsAllLink: {
    ...typography.body,
    color: '#d39a6a',
    fontWeight: '600',
    fontSize: 15,
  },
  eventsList: {
    gap: 16,
    marginBottom: 24,
  },
  eventListItem: {
    flexDirection: 'row',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0e0d0',
  },
  eventListImage: {
    width: 100,
    height: 100,
    backgroundColor: '#f5e5d5',
  },
  eventListContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  eventListTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  eventListDetails: {
    marginBottom: 8,
  },
  eventDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  eventListDate: {
    ...typography.caption,
    color: '#d39a6a',
    fontSize: 13,
  },
  eventListLocation: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
  },
  eventListFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventListSpots: {
    ...typography.caption,
    color: '#d39a6a',
    fontSize: 13,
    fontWeight: '600',
  },
  gradientSmallButton: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  eventListButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  rulesMainTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    fontSize: 22,
    marginTop: 20,
    marginBottom: 16,
  },
  rulesList: {
    gap: 16,
    marginBottom: 32,
  },
  ruleItem: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f0e0d0',
  },
  ruleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ruleItemNumber: {
    ...typography.caption,
    color: '#d39a6a',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginLeft: 4,
  },
  ruleItemTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 18,
    marginBottom: 8,
    fontWeight: '600',
  },
  ruleItemDescription: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
});