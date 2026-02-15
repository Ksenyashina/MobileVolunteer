import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput
} from 'react-native';
import { typography } from '../theme/typography';
import { colors } from '../theme/colors';

export default function ProfileSettingsScreen({ navigation }) {
  const [skillsModalVisible, setSkillsModalVisible] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([
    'Программирование',
    'Видеомонтаж',
    'Кулинария'
  ]);
  const [tempSelectedSkills, setTempSelectedSkills] = useState([]);

  const availableSkills = [
    'Английский язык',
    'Вождение',
    'Фотосъемка',
    'Первая помощь',
    'Дизайн',
    'Координация',
    'Работа с детьми',
    'Организаторские способности',
    'Работа в команде',
    'Публичные выступления',
    'SMM и маркетинг',
    'Музыкальные навыки',
    'Спортивная подготовка'
  ];

  const openSkillsModal = () => {
    setTempSelectedSkills([...selectedSkills]);
    setSkillsModalVisible(true);
  };

  const toggleSkill = (skill) => {
    if (tempSelectedSkills.includes(skill)) {
      setTempSelectedSkills(tempSelectedSkills.filter(s => s !== skill));
    } else {
      setTempSelectedSkills([...tempSelectedSkills, skill]);
    }
  };

  const saveSkills = () => {
    setSelectedSkills(tempSelectedSkills);
    setSkillsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Хедер с кнопкой назад */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Настройки профиля</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Профиль */}
        <View style={styles.profileSection}>
          <Text style={styles.sectionTitle}>Профиль</Text>

          <View style={styles.profileField}>
            <Text style={styles.fieldLabel}>ИМЯ</Text>
            <TextInput
              style={styles.fieldInput}
              value="Ксения Сеняшина"
              placeholder="Введите имя"
            />
          </View>

          <View style={styles.profileField}>
            <Text style={styles.fieldLabel}>EMAIL</Text>
            <TextInput
              style={styles.fieldInput}
              value="Ksenya421@mail.ru"
              placeholder="Введите email"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.profileField}>
            <Text style={styles.fieldLabel}>ГОРОД</Text>
            <TextInput
              style={styles.fieldInput}
              value="Казань"
              placeholder="Введите город"
            />
          </View>

          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Сохранить изменения</Text>
          </TouchableOpacity>
        </View>

        {/* Навыки */}
        <View style={styles.skillsSection}>
          <Text style={styles.sectionTitle}>Навыки</Text>

          <View style={styles.skillsList}>
            {selectedSkills.map((skill, index) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillTagText}>{skill}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.addButton} onPress={openSkillsModal}>
            <Text style={styles.addButtonText}>+ Добавить навык</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Модальное окно выбора навыков */}
      <Modal
        visible={skillsModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSkillsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Выберите навыки</Text>

            <ScrollView style={styles.skillsGrid}>
              {availableSkills.map((skill, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.skillOption,
                    tempSelectedSkills.includes(skill) && styles.skillOptionSelected
                  ]}
                  onPress={() => toggleSkill(skill)}
                >
                  <Text style={[
                    styles.skillOptionText,
                    tempSelectedSkills.includes(skill) && styles.skillOptionTextSelected
                  ]}>
                    {skill}
                  </Text>
                  {tempSelectedSkills.includes(skill) && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setSkillsModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Отмена</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSaveButton}
                onPress={saveSkills}
              >
                <Text style={styles.modalSaveText}>Добавить</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    ...typography.body,
    color: '#d39a6a',
    fontSize: 15,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: 20,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  profileField: {
    marginBottom: 16,
  },
  fieldLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  fieldInput: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingVertical: 8,
  },
  saveButton: {
    backgroundColor: '#d39a6a',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  skillsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: 20,
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  skillTag: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  skillTagText: {
    ...typography.caption,
    color: colors.textPrimary,
    fontSize: 13,
  },
  addButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
  },
  addButtonText: {
    ...typography.body,
    color: '#d39a6a',
    fontSize: 14,
    fontWeight: '500',
  },
  // Модальное окно
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  skillsGrid: {
    maxHeight: 400,
  },
  skillOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  skillOptionSelected: {
    backgroundColor: '#d39a6a15',
  },
  skillOptionText: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 15,
  },
  skillOptionTextSelected: {
    color: '#d39a6a',
    fontWeight: '500',
  },
  checkmark: {
    color: '#d39a6a',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  modalCancelText: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 15,
  },
  modalSaveButton: {
    flex: 1,
    backgroundColor: '#d39a6a',
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft: 8,
    borderRadius: 8,
  },
  modalSaveText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});