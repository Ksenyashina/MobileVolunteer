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
import { typography } from '../../theme/typography';
import { colors } from '../../theme/colors';

export default function AboutModal({ visible, onClose }) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>О платформе</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <Text style={styles.aboutText}>
            Мы создаем цифровую экосистему для развития волонтерства.
            Наша миссия — сделать помощь доступной, прозрачной и эффективной.
          </Text>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✅</Text>
            <View>
              <Text style={styles.featureTitle}>Надёжность</Text>
              <Text style={styles.featureDesc}>Верифицированные организаторы и волонтёры</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>❗️</Text>
            <View>
              <Text style={styles.featureTitle}>Эффективность</Text>
              <Text style={styles.featureDesc}>Умный подбор мероприятий по навыкам</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>❤️</Text>
            <View>
              <Text style={styles.featureTitle}>Сообщество</Text>
              <Text style={styles.featureDesc}>Поддержка культуры взаимопомощи</Text>
            </View>
          </View>

          <Text style={styles.digitalTag}>Digital Volunteering</Text>
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
  aboutText: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  featureIcon: {
    fontSize: 24,
    width: 40,
  },
  featureTitle: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDesc: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 14,
  },
  digitalTag: {
    ...typography.caption,
    color: '#d39a6a',
    textAlign: 'right',
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 20,
  },
});