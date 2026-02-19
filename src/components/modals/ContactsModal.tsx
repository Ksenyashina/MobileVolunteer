import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { typography } from '../../theme/typography';
import { colors } from '../../theme/colors';

export default function ContactsModal({ visible, onClose }) {
  const contacts = [
    {
      type: 'email',
      icon: 'mail-outline',
      label: 'Электронная почта',
      value: 'support@volunteer.ru',
      action: () => Linking.openURL('mailto:support@volunteer.ru'),
    },
    {
      type: 'phone',
      icon: 'call-outline',
      label: 'Телефон',
      value: '+7 (999) 000-00-00',
      action: () => Linking.openURL('tel:+79990000000'),
    },
    {
      type: 'location',
      icon: 'location-outline',
      label: 'Адрес',
      value: 'г. Москва, ул. Волонтёрская, д. 1',
      action: () => Linking.openURL('https://maps.google.com/?q=Москва+Волонтёрская+1'),
    },
  ];

  const socials = [
    { name: 'Telegram', icon: 'paper-plane-outline', url: 'https://t.me/volunteer' },
    { name: 'ВКонтакте', icon: 'logo-vk', url: 'https://vk.com/volunteer' },
    { name: 'Instagram', icon: 'logo-instagram', url: 'https://instagram.com/volunteer' },
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
                <Text style={styles.title}>Контакты</Text>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Ionicons name="close" size={24} color="#d39a6a" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.heroSection}>
                  <Ionicons name="chatbubbles-outline" size={48} color="#d39a6a" />
                  <Text style={styles.heroTitle}>Свяжитесь с нами</Text>
                  <Text style={styles.heroText}>
                    Мы всегда рады помочь и ответить на ваши вопросы
                  </Text>
                </View>

                <Text style={styles.sectionTitle}>Основные контакты</Text>

                {contacts.map((contact, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.contactCard}
                    onPress={contact.action}
                    activeOpacity={0.7}
                  >
                    <View style={styles.contactIconContainer}>
                      <Ionicons name={contact.icon} size={24} color="#d39a6a" />
                    </View>
                    <View style={styles.contactInfo}>
                      <Text style={styles.contactLabel}>{contact.label}</Text>
                      <Text style={styles.contactValue}>{contact.value}</Text>
                    </View>
                    <Ionicons name="open-outline" size={20} color="#d39a6a" />
                  </TouchableOpacity>
                ))}

                <Text style={styles.sectionTitle}>Социальные сети</Text>

                <View style={styles.socialGrid}>
                  {socials.map((social, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.socialCard}
                      onPress={() => Linking.openURL(social.url)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.socialIconContainer}>
                        <Ionicons name={social.icon} size={32} color="#d39a6a" />
                      </View>
                      <Text style={styles.socialName}>{social.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.workHoursCard}>
                  <Ionicons name="time-outline" size={24} color="#d39a6a" />
                  <View style={styles.workHoursInfo}>
                    <Text style={styles.workHoursTitle}>Время работы поддержки</Text>
                    <Text style={styles.workHoursText}>Пн-Пт: 9:00 - 20:00</Text>
                    <Text style={styles.workHoursText}>Сб-Вс: 10:00 - 18:00</Text>
                  </View>
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
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
  },
  sectionTitle: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  contactCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
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
  contactIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff0e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: 2,
  },
  contactValue: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
  socialGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  socialCard: {
    width: '30%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0e0d0',
    shadowColor: '#d39a6a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  socialIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff0e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  socialName: {
    ...typography.caption,
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '500',
  },
  workHoursCard: {
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
  workHoursInfo: {
    flex: 1,
  },
  workHoursTitle: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  workHoursText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
  },
});