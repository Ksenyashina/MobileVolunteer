import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Page from '../components/layout/Page';
import { typography } from '../theme/typography';
import { colors } from '../theme/colors';
import { radius } from '../theme/radius';

// Типы для пользователя и ролей
type UserRole = 'user' | 'volunteer' | 'organizer' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
  registeredDate: string;
  city: string;
}

// Мок-данные для пользователей
const initialUsers: User[] = [
  {
    id: '1',
    name: 'Ксения Сеняшина',
    email: 'ksenya421@mail.ru',
    roles: ['user', 'volunteer'],
    registeredDate: '11.12.2025',
    city: 'Казань'
  },
  {
    id: '2',
    name: 'Сергей Петров',
    email: 'celezen.bol@gmail.com',
    roles: ['user', 'volunteer', 'organizer'],
    registeredDate: '11.12.2025',
    city: 'Казань'
  },
  {
    id: '3',
    name: 'Александр Смирнов',
    email: 'alex.smirnov@example.com',
    roles: ['user', 'organizer'],
    registeredDate: '11.12.2025',
    city: 'Москва'
  },
  {
    id: '4',
    name: 'Екатерина Волкова',
    email: 'ekaterina.volkova@example.com',
    roles: ['user', 'volunteer'],
    registeredDate: '11.12.2025',
    city: 'Санкт-Петербург'
  },
  {
    id: '5',
    name: 'Дмитрий Иванов',
    email: 'dmitry.ivanov@example.com',
    roles: ['user'],
    registeredDate: '10.12.2025',
    city: 'Новосибирск'
  },
];

// Список доступных ролей
const availableRoles: { value: UserRole; label: string; description: string }[] = [
  { value: 'admin', label: 'admin', description: 'Администратор системы' },
  { value: 'user', label: 'user', description: 'Обычный пользователь' },
  { value: 'volunteer', label: 'volunteer', description: 'Волонтер' },
  { value: 'organizer', label: 'organizer', description: 'Организатор мероприятий' },
];

// Функция для получения цвета роли
const getRoleColor = (role: UserRole) => {
  switch(role) {
    case 'admin':
      return { bg: '#fff0e8', text: '#d39a6a' };
    case 'organizer':
      return { bg: '#fff0e8', text: '#d39a6a' };
    case 'volunteer':
      return { bg: '#fff0e8', text: '#d39a6a' };
    default:
      return { bg: '#f0f0f0', text: '#999' };
  }
};

export default function AdminUsersScreen({ navigation }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [tempRoles, setTempRoles] = useState<UserRole[]>([]);

  const openRoleModal = (user: User) => {
    setSelectedUser(user);
    setTempRoles([...user.roles]);
    setModalVisible(true);
  };

  const toggleRole = (role: UserRole) => {
    if (role === 'user') {
      return;
    }

    setTempRoles(prev => {
      if (prev.includes(role)) {
        return prev.filter(r => r !== role);
      } else {
        return [...prev, role];
      }
    });
  };

  const saveRoles = () => {
    if (!selectedUser) return;

    const finalRoles = tempRoles.includes('user') ? tempRoles : ['user', ...tempRoles];

    setUsers(prev =>
      prev.map(u =>
        u.id === selectedUser.id ? { ...u, roles: finalRoles } : u
      )
    );

    setModalVisible(false);
    Alert.alert('Успешно', 'Роли пользователя обновлены');
  };

  return (
    <Page>
      <LinearGradient
        colors={['#fff9f5', '#fff0e8']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Хедер с кнопкой назад */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#d39a6a" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Управление пользователями</Text>
          </View>
        </View>

        <FlatList
          data={users}
          keyExtractor={u => u.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.userCard}>
              <View style={styles.userHeader}>
                <View>
                  <Text style={styles.userName}>{item.name}</Text>
                  <Text style={styles.userEmail}>{item.email}</Text>
                </View>
              </View>

              <View style={styles.userDetails}>
                <Ionicons name="calendar-outline" size={14} color="#d39a6a" />
                <Text style={styles.userDetailText}> Рег: {item.registeredDate}</Text>
              </View>

              <View style={styles.userDetails}>
                <Ionicons name="location-outline" size={14} color="#d39a6a" />
                <Text style={styles.userDetailText}> {item.city}</Text>
              </View>

              <View style={styles.rolesContainer}>
                <Text style={styles.rolesLabel}>Роли:</Text>
                <View style={styles.rolesList}>
                  {item.roles.map(role => {
                    const colors = getRoleColor(role);
                    return (
                      <View key={role} style={[styles.roleBadge, { backgroundColor: colors.bg }]}>
                        <Text style={[styles.roleText, { color: colors.text }]}>
                          {role}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>

              <TouchableOpacity
                style={styles.editButton}
                onPress={() => openRoleModal(item)}
              >
                <Ionicons name="create-outline" size={18} color="#d39a6a" />
                <Text style={styles.editButtonText}>Изменить роли</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        {/* Модальное окно для выбора ролей */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Управление ролями</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={24} color="#d39a6a" />
                </TouchableOpacity>
              </View>

              <Text style={styles.modalSubtitle}>
                Пользователь: {selectedUser?.name}
              </Text>

              <ScrollView style={styles.modalBody}>
                {availableRoles.map((role) => {
                  const isSelected = tempRoles.includes(role.value);

                  return (
                    <TouchableOpacity
                      key={role.value}
                      style={[
                        styles.roleOption,
                        isSelected && styles.roleOptionSelected,
                      ]}
                      onPress={() => toggleRole(role.value)}
                    >
                      <View style={styles.roleOptionLeft}>
                        <Text style={styles.roleOptionLabel}>
                          {role.label}
                        </Text>
                        <Text style={styles.roleOptionDescription}>
                          {role.description}
                        </Text>
                      </View>
                      {isSelected && (
                        <View style={styles.checkmarkContainer}>
                          <Ionicons name="checkmark" size={18} color="#4CAF50" />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={styles.modalCancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalCancelText}>Отмена</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalSaveButton}
                  onPress={saveRoles}
                >
                  <Text style={styles.modalSaveText}>Сохранить</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
    alignItems: 'center',
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0e0d0',
    shadowColor: '#d39a6a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  userHeader: {
    marginBottom: 8,
  },
  userName: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  userEmail: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userDetailText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 13,
    marginLeft: 4,
  },
  rolesContainer: {
    marginTop: 8,
    marginBottom: 12,
  },
  rolesLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  rolesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  roleBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  roleText: {
    fontSize: 11,
    fontWeight: '500',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d39a6a',
    backgroundColor: '#fff',
    gap: 4,
    marginTop: 4,
  },
  editButtonText: {
    color: '#d39a6a',
    fontSize: 13,
    fontWeight: '500',
  },
  // Модальное окно
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0e0d0',
    backgroundColor: '#fff',
  },
  modalTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  modalSubtitle: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  modalBody: {
    padding: 20,
  },
  roleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#f0e0d0',
  },
  roleOptionSelected: {
    backgroundColor: '#e8f5e9', // бледно-светло-зеленый
    borderColor: '#4CAF50',
  },
  roleOptionLeft: {
    flex: 1,
  },
  roleOptionLabel: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  roleOptionDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
  },
  checkmarkContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0e0d0',
    gap: 12,
    backgroundColor: '#fff',
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#f0e0d0',
    backgroundColor: '#fff',
  },
  modalCancelText: {
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: '500',
  },
  modalSaveButton: {
    flex: 1,
    backgroundColor: '#d39a6a',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: radius.lg,
  },
  modalSaveText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});