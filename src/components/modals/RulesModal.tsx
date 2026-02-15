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

export default function RulesModal({ visible, onClose }) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Правила сообщества</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.ruleItem}>
            <Text style={styles.ruleNumber}>01</Text>
            <Text style={styles.ruleTitle}>Взаимоуважение</Text>
            <Text style={styles.ruleDescription}>
              Мы ценим каждого участника и поддерживаем атмосферу доверия и уважения.
            </Text>
          </View>

          <View style={styles.ruleItem}>
            <Text style={styles.ruleNumber}>02</Text>
            <Text style={styles.ruleTitle}>Ответственность</Text>
            <Text style={styles.ruleDescription}>
              Серьезный подход к взятым обязательствам — основа нашей работы.
            </Text>
          </View>

          <View style={styles.ruleItem}>
            <Text style={styles.ruleNumber}>03</Text>
            <Text style={styles.ruleTitle}>Безопасность</Text>
            <Text style={styles.ruleDescription}>
              Мы строго следим за безопасностью данных и мероприятий.
            </Text>
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
  ruleItem: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0e0d0',
  },
  ruleNumber: {
    ...typography.caption,
    color: '#d39a6a',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ruleTitle: {
    ...typography.body,
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
  },
});