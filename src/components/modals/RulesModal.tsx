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
import { radius } from '../../theme/radius';

export default function RulesModal({ visible, onClose }) {
  const rules = [
    {
      id: '01',
      title: 'Взаимоуважение',
      description: 'Мы ценим каждого участника и поддерживаем атмосферу доверия и уважения.',
      icon: 'heart-outline',
      details: '• Уважайте мнение других\n• Будьте тактичны в общении\n• Помогайте новичкам'
    },
    {
      id: '02',
      title: 'Ответственность',
      description: 'Серьезный подход к взятым обязательствам — основа нашей работы.',
      icon: 'checkmark-done-outline',
      details: '• Подтверждайте участие вовремя\n• Предупреждайте об отмене\n• Соблюдайте договоренности'
    },
    {
      id: '03',
      title: 'Безопасность',
      description: 'Мы строго следим за безопасностью данных и мероприятий.',
      icon: 'shield-outline',
      details: '• Не передавайте личные данные\n• Сообщайте о нарушениях\n• Следуйте инструкциям'
    }
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
                <Text style={styles.title}>Правила сообщества</Text>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Ionicons name="close" size={24} color="#d39a6a" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.introCard}>
                  <Ionicons name="document-text-outline" size={32} color="#d39a6a" />
                  <Text style={styles.introText}>
                    Соблюдение этих правил помогает нам создавать безопасное и комфортное пространство для всех участников.
                  </Text>
                </View>

                {rules.map((rule) => (
                  <View key={rule.id} style={styles.ruleCard}>
                    <View style={styles.ruleHeader}>
                      <View style={styles.ruleNumberContainer}>
                        <Text style={styles.ruleNumber}>{rule.id}</Text>
                      </View>
                      <View style={styles.ruleIconContainer}>
                        <Ionicons name={rule.icon} size={24} color="#d39a6a" />
                      </View>
                    </View>

                    <Text style={styles.ruleTitle}>{rule.title}</Text>
                    <Text style={styles.ruleDescription}>{rule.description}</Text>

                    <View style={styles.ruleDetails}>
                      <Text style={styles.ruleDetailsText}>{rule.details}</Text>
                    </View>
                  </View>
                ))}

                <View style={styles.footerNote}>
                  <Ionicons name="alert-circle-outline" size={20} color="#d39a6a" />
                  <Text style={styles.footerText}>
                    Нарушение правил может привести к ограничению доступа к платформе
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
    maxHeight: '90%',
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
  introCard: {
    flexDirection: 'row',
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
    gap: 12,
  },
  introText: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  ruleCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f0e0d0',
    shadowColor: '#d39a6a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  ruleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ruleNumberContainer: {
    backgroundColor: '#fff0e8',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  ruleNumber: {
    ...typography.caption,
    color: '#d39a6a',
    fontSize: 14,
    fontWeight: 'bold',
  },
  ruleIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff0e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ruleTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  ruleDescription: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  ruleDetails: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#f0e0d0',
  },
  ruleDetailsText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  footerNote: {
    flexDirection: 'row',
    backgroundColor: '#fff0e8',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 10,
    gap: 8,
    alignItems: 'center',
  },
  footerText: {
    ...typography.caption,
    color: '#d39a6a',
    fontSize: 13,
    flex: 1,
  },
});