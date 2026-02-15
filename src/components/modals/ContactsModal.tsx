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
import { typography } from '../../theme/typography';
import { colors } from '../../theme/colors';

export default function ContactsModal({ visible, onClose }) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Контакты</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.contactSection}>
            <Text style={styles.sectionTitle}>Электронная почта</Text>
            <TouchableOpacity
              onPress={() => Linking.openURL('mailto:support@volunteer.ru')}
            >
              <Text style={styles.contactLink}>support@volunteer.ru</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contactSection}>
            <Text style={styles.sectionTitle}>Телефон</Text>
            <TouchableOpacity
              onPress={() => Linking.openURL('tel:+79990000000')}
            >
              <Text style={styles.contactLink}>+7 (999) 000-00-00</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contactSection}>
            <Text style={styles.sectionTitle}>Адрес</Text>
            <Text style={styles.contactText}>г. Москва, ул. Волонтёрская, д. 1</Text>
          </View>

          <View style={styles.contactSection}>
            <Text style={styles.sectionTitle}>Социальные сети</Text>
            <TouchableOpacity style={styles.socialLink}>
              <Text style={styles.socialLinkText}>Telegram</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialLink}>
              <Text style={styles.socialLinkText}>ВКонтакте</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  content: {
    padding: 20,
  },
  contactSection: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0e0d0',
  },
  sectionTitle: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  contactLink: {
    ...typography.body,
    color: '#d39a6a',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  contactText: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 16,
  },
  socialLink: {
    marginTop: 8,
  },
  socialLinkText: {
    ...typography.body,
    color: '#d39a6a',
    fontSize: 16,
  },
});