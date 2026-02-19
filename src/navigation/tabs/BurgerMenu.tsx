import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { typography } from '../../theme/typography';
import { colors } from '../../theme/colors';

export default function BurgerMenu({
  navigation,
  userEmail = null,

  // 👇 ВАЖНО — получаем обработчики модалок
  onAboutPress,
  onRulesPress,
  onContactsPress,
  onStatsPress
}) {
  const [menuVisible, setMenuVisible] = useState(false);

  const closeMenu = () => setMenuVisible(false);

  const menuItems = [
    {
      id: 'home',
      label: 'Главная',
      icon: 'home-outline',
      onPress: () => {
        closeMenu();
        navigation.navigate('Public');
      }
    },
    {
      id: 'about',
      label: 'О платформе',
      icon: 'information-circle-outline',
      onPress: () => {
        closeMenu();
        onAboutPress?.();
      }
    },
    {
      id: 'rules',
      label: 'Правила сообщества',
      icon: 'document-text-outline',
      onPress: () => {
        closeMenu();
        onRulesPress?.();
      }
    },
    {
      id: 'contacts',
      label: 'Контакты',
      icon: 'call-outline',
      onPress: () => {
        closeMenu();
        onContactsPress?.();
      }
    },
    {
      id: 'stats',
      label: 'Статистика',
      icon: 'bar-chart-outline',
      onPress: () => {
        closeMenu();
        onStatsPress?.();
      }
    },
  ];

  if (userEmail) {
    menuItems.push(
      {
        id: 'profile',
        label: 'Профиль',
        icon: 'person-outline',
        onPress: () => {
          closeMenu();
          navigation.navigate('ProfileSettings');
        }
      },
      {
        id: 'logout',
        label: 'Выйти',
        icon: 'log-out-outline',
        accent: true,
        onPress: () => {
          closeMenu();
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
        closeMenu();
        navigation.navigate('Auth');
      }
    });
  }

  return (
    <>
      <TouchableOpacity
        style={styles.burgerButton}
        onPress={() => setMenuVisible(true)}
      >
        <View style={styles.burgerLine} />
        <View style={styles.burgerLine} />
        <View style={styles.burgerLine} />
      </TouchableOpacity>

      <Modal
        visible={menuVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={closeMenu}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalLogo}>VolonterPlatform</Text>
            <TouchableOpacity onPress={closeMenu}>
              <Ionicons name="close-outline" size={26} color="#d39a6a" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {menuItems.map(item => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.modalItem,
                  item.accent && styles.modalItemAccent
                ]}
                onPress={item.onPress}
              >
                <Ionicons
                  name={item.icon}
                  size={24}
                  color={item.accent ? '#fff' : '#d39a6a'}
                />
                <Text
                  style={[
                    styles.modalItemText,
                    item.accent && styles.modalItemTextAccent
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  burgerButton: { padding: 8 },
  burgerLine: {
    width: 24,
    height: 2,
    marginVertical: 2,
    backgroundColor: '#d39a6a'
  },

  modalContainer: { flex: 1, backgroundColor: '#fff' },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },

  modalLogo: {
    ...typography.h3,
    fontWeight: 'bold'
  },

  modalContent: { padding: 16 },

  modalItem: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#F9F9F9',
    marginBottom: 10
  },

  modalItemAccent: {
    backgroundColor: '#d39a6a'
  },

  modalItemText: {
    ...typography.body
  },

  modalItemTextAccent: {
    color: '#fff'
  }
});
