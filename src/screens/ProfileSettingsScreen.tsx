import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Page from '../components/layout/Page';
import { typography } from '../theme/typography';
import { colors } from '../theme/colors';
import { radius } from '../theme/radius';
import { useFormValidation, validationRules } from '../hooks/useFormValidation';

export default function ProfileSettingsScreen({ navigation }) {
  const [skillsModalVisible, setSkillsModalVisible] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([
    'Программирование',
    'Видеомонтаж',
    'Кулинария'
  ]);
  const [tempSelectedSkills, setTempSelectedSkills] = useState([]);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
  } = useFormValidation(
    { name: 'Ксения Сеняшина', email: 'Ksenya421@mail.ru', phone: '+7 (999) 000-00-00', city: 'Казань' },
    validationRules.profile
  );

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

  const handleSaveProfile = () => {
    if (validateForm()) {
      Alert.alert('Успешно', 'Изменения сохранены');
    } else {
      Alert.alert('Ошибка', 'Пожалуйста, исправьте ошибки в форме');
    }
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
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#d39a6a" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Настройки профиля</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Профиль */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Профиль</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.fieldLabel}>ИМЯ</Text>
              <TextInput
                style={[styles.input, touched.name && errors.name ? styles.inputError : null]}
                value={values.name}
                onChangeText={(text) => handleChange('name', text)}
                onBlur={() => handleBlur('name')}
                placeholder="Введите имя"
                placeholderTextColor="#999"
              />
              {touched.name && errors.name ? (
                <Text style={styles.errorText}>{errors.name}</Text>
              ) : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.fieldLabel}>EMAIL</Text>
              <TextInput
                style={[styles.input, touched.email && errors.email ? styles.inputError : null]}
                value={values.email}
                onChangeText={(text) => handleChange('email', text)}
                onBlur={() => handleBlur('email')}
                placeholder="Введите email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {touched.email && errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.fieldLabel}>ТЕЛЕФОН</Text>
              <TextInput
                style={[styles.input, touched.phone && errors.phone ? styles.inputError : null]}
                value={values.phone}
                onChangeText={(text) => handleChange('phone', text)}
                onBlur={() => handleBlur('phone')}
                placeholder="+7 (999) 000-00-00"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
              />
              {touched.phone && errors.phone ? (
                <Text style={styles.errorText}>{errors.phone}</Text>
              ) : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.fieldLabel}>ГОРОД</Text>
              <TextInput
                style={[styles.input, touched.city && errors.city ? styles.inputError : null]}
                value={values.city}
                onChangeText={(text) => handleChange('city', text)}
                onBlur={() => handleBlur('city')}
                placeholder="Введите город"
                placeholderTextColor="#999"
              />
              {touched.city && errors.city ? (
                <Text style={styles.errorText}>{errors.city}</Text>
              ) : null}
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
              <Text style={styles.saveButtonText}>Сохранить изменения</Text>
            </TouchableOpacity>
          </View>

          {/* Навыки */}
          <View style={styles.card}>
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
                      <Ionicons name="checkmark" size={20} color="#d39a6a" />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0e0d0',
    backgroundColor: 'transparent',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f5e5d5',
    shadowColor: '#d39a6a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  inputContainer: {
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
  input: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#f0e0d0',
    borderRadius: radius.lg,
    padding: 12,
    backgroundColor: '#f9f9f9',
  },
  inputError: {
    borderColor: '#ff6b6b',
    borderWidth: 2,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  saveButton: {
    backgroundColor: '#d39a6a',
    borderRadius: radius.lg,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  skillTag: {
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#f0e0d0',
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
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
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
    backgroundColor: '#fff0e8',
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
    paddingVertical: 14,
    alignItems: 'center',
    marginRight: 8,
    borderRadius: radius.lg,
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
    paddingVertical: 14,
    alignItems: 'center',
    marginLeft: 8,
    borderRadius: radius.lg,
  },
  modalSaveText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});