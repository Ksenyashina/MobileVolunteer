import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ScrollView,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { typography } from '../../theme/typography';
import { colors } from '../../theme/colors';

const { width } = Dimensions.get('window');

export default function BurgerMenu({ navigation, userEmail = null }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const menuItems = [
    {
      id: 'home',
      label: 'Главная',
      icon: 'home-outline',
      onPress: () => {
        setMenuVisible(false);
        navigation.navigate('Public');
      }
    },
    {
      id: 'about',
      label: 'О платформе',
      icon: 'information-circle-outline',
      onPress: () => {
        setMenuVisible(false);
        navigation.navigate('AboutModal');
      }
    },
    {
      id: 'rules',
      label: 'Правила сообщества',
      icon: 'document-text-outline',
      onPress: () => {
        setMenuVisible(false);
        navigation.navigate('RulesModal');
      }
    },
    {
      id: 'contacts',
      label: 'Контакты',
      icon: 'call-outline',
      onPress: () => {
        setMenuVisible(false);
        navigation.navigate('ContactsModal');
      }
    },
    {
      id: 'stats',
      label: 'Статистика',
      icon: 'bar-chart-outline',
      onPress: () => {
        setMenuVisible(false);
        navigation.navigate('StatsModal');
      }
    },
  ];

  // Если пользователь авторизован, добавляем пункты меню
  if (userEmail) {
    menuItems.push(
      {
        id: 'profile',
        label: 'Профиль',
        icon: 'person-outline',
        onPress: () => {
          setMenuVisible(false);
          navigation.navigate('ProfileSettings');
        }
      },
      {
        id: 'logout',
        label: 'Выйти',
        icon: 'log-out-outline',
        accent: true,
        onPress: () => {
          setMenuVisible(false);
          navigation.navigate('Auth');
        }
      }
    );
  } else {
    menuItems.push({
      id: 'login',
      label: 'Войти',
      icon: 'log-in-outline',
      accent: true,
      onPress: () => {
        setMenuVisible(false);
        navigation.navigate('Auth');
      }
    });
  }

  return (
    <>
      {/* Кнопка бургер */}
      <TouchableOpacity
        style={styles.burgerButton}
        onPress={() => setMenuVisible(true)}
        activeOpacity={0.7}
      >
        <View style={[styles.burgerLine, { backgroundColor: '#d39a6a' }]} />
        <View style={[styles.burgerLine, { backgroundColor: '#d39a6a' }]} />
        <View style={[styles.burgerLine, { backgroundColor: '#d39a6a' }]} />
      </TouchableOpacity>

      {/* Модальное окно меню */}
      <Modal
        visible={menuVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setMenuVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalLogo}>VolonterPlatform</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setMenuVisible(false)}
            >
              <Ionicons name="close-outline" size={24} color="#d39a6a" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.modalItem,
                  item.accent && styles.modalItemAccent
                ]}
                onPress={item.onPress}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={item.icon}
                  size={26}
                  color={item.accent ? '#FFFFFF' : '#d39a6a'}
                  style={styles.modalItemIcon}
                />
                <Text style={[
                  styles.modalItemText,
                  item.accent && styles.modalItemTextAccent
                ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.modalFooter}>
            <Text style={styles.modalFooterText}>Версия 1.0.0</Text>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  burgerButton: {
    padding: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  burgerLine: {
    width: 24,
    height: 2,
    marginVertical: 2,
    borderRadius: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  modalLogo: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalCloseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 16,
    marginBottom: 10,
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  modalItemAccent: {
    backgroundColor: '#d39a6a',
    marginTop: 20,
    borderWidth: 0,
  },
  modalItemIcon: {
    marginRight: 16,
    width: 32,
    textAlign: 'center',
  },
  modalItemText: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 17,
    flex: 1,
    fontWeight: '500',
  },
  modalItemTextAccent: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  modalFooterText: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    fontSize: 14,
  },
});