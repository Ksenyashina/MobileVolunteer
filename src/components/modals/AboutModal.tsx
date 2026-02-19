import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { typography } from '../../theme/typography';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';

export default function AboutModal({ visible, onClose }) {
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
                <Text style={styles.title}>О платформе</Text>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Ionicons name="close" size={24} color="#d39a6a" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.heroSection}>
                  <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>VolonterPlatform</Text>
                  </View>
                  <Text style={styles.tagline}>Технологии добрых дел</Text>
                </View>

                <View style={styles.missionCard}>
                  <Text style={styles.missionTitle}>Наша миссия</Text>
                  <Text style={styles.missionText}>
                    Мы создаем цифровую экосистему для развития волонтерства,
                    объединяя людей, ресурсы и технологии для решения социальных задач.
                  </Text>
                </View>

                <Text style={styles.sectionTitle}>Ключевые принципы</Text>

                <View style={styles.featuresGrid}>
                  <View style={styles.featureCard}>
                    <View style={[styles.featureIconContainer, { backgroundColor: '#fff0e8' }]}>
                      <Ionicons name="shield-checkmark-outline" size={28} color="#d39a6a" />
                    </View>
                    <Text style={styles.featureTitle}>Надёжность</Text>
                    <Text style={styles.featureDesc}>Верифицированные организаторы и волонтёры</Text>
                  </View>

                  <View style={styles.featureCard}>
                    <View style={[styles.featureIconContainer, { backgroundColor: '#fff0e8' }]}>
                      <Ionicons name="flash-outline" size={28} color="#d39a6a" />
                    </View>
                    <Text style={styles.featureTitle}>Эффективность</Text>
                    <Text style={styles.featureDesc}>Умный подбор мероприятий по навыкам</Text>
                  </View>

                  <View style={styles.featureCard}>
                    <View style={[styles.featureIconContainer, { backgroundColor: '#fff0e8' }]}>
                      <Ionicons name="heart-outline" size={28} color="#d39a6a" />
                    </View>
                    <Text style={styles.featureTitle}>Сообщество</Text>
                    <Text style={styles.featureDesc}>Поддержка культуры взаимопомощи</Text>
                  </View>

                  <View style={styles.featureCard}>
                    <View style={[styles.featureIconContainer, { backgroundColor: '#fff0e8' }]}>
                      <Ionicons name="globe-outline" size={28} color="#d39a6a" />
                    </View>
                    <Text style={styles.featureTitle}>Доступность</Text>
                    <Text style={styles.featureDesc}>Помощь рядом с вами в любом городе</Text>
                  </View>
                </View>

                <View style={styles.statsPreview}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>10k+</Text>
                    <Text style={styles.statLabel}>Волонтёров</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>500+</Text>
                    <Text style={styles.statLabel}>Мероприятий</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>50+</Text>
                    <Text style={styles.statLabel}>Городов</Text>
                  </View>
                </View>

                <Text style={styles.digitalTag}>#DigitalVolunteering</Text>
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
  heroSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoContainer: {
    backgroundColor: '#fae1d6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 40,
    marginBottom: 8,
  },
  logoText: {
    ...typography.h2,
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: 'bold',
  },
  tagline: {
    ...typography.body,
    color: '#d39a6a',
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  missionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#f0e0d0',
    shadowColor: '#d39a6a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  missionTitle: {
    ...typography.body,
    color: '#d39a6a',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  missionText: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
  sectionTitle: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
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
  featureIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDesc: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 14,
  },
  statsPreview: {
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
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...typography.h3,
    color: '#d39a6a',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 11,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#f0e0d0',
    marginHorizontal: 8,
  },
  digitalTag: {
    ...typography.caption,
    color: '#d39a6a',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'italic',
    marginBottom: 10,
  },
});