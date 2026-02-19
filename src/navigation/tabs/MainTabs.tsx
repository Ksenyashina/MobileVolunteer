import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Импорты стеков
import DashboardStack from '../stacks/DashboardStack';
import AdminStack from '../stacks/AdminStack';
import EventsStack from '../stacks/EventsStack';
import MyApplicationsScreen from '../../screens/MyApplicationsScreen';
import OrganizationApplicationsScreen from '../../screens/OrganizationApplicationsScreen';
import AdminOverviewScreen from '../../screens/AdminOverviewScreen';

import { typography } from '../../theme/typography';
import { colors } from '../../theme/colors';

const Tab = createBottomTabNavigator();

// ВРЕМЕННО: для теста ставим false, чтобы неавторизованный не видел кабинет
const isAuthenticated = true; // Позже заменится на реальную проверку из контекста
const userRole = 'admin'; // 'user', 'volunteer', 'organizer', 'admin'

export default function MainTabs() {
  // Если пользователь не авторизован - не показываем табы с кабинетом
  if (!isAuthenticated) {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
        }}
      >
        {/* Только мероприятия доступны без авторизации */}
        <Tab.Screen
          name="EventsStack"
          component={EventsStack}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity {...props} style={styles.tabItem}>
                <Ionicons
                  name="calendar-outline"
                  size={24}
                  color={props.accessibilityState?.selected ? '#d39a6a' : '#999999'}
                />
                <Text style={[
                  styles.tabText,
                  props.accessibilityState?.selected && styles.tabTextActive
                ]}>
                  Мероприятия
                </Text>
              </TouchableOpacity>
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  // Авторизован - показываем все табы в зависимости от роли
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      {/* Кабинет - доступен всем авторизованным */}
      <Tab.Screen
        name="DashboardStack"
        component={DashboardStack}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity {...props} style={styles.tabItem}>
              <Ionicons
                name="person-outline"
                size={24}
                color={props.accessibilityState?.selected ? '#d39a6a' : '#999999'}
              />
              <Text style={[
                styles.tabText,
                props.accessibilityState?.selected && styles.tabTextActive
              ]}>
                Кабинет
              </Text>
            </TouchableOpacity>
          ),
        }}
      />

      {/* Мероприятия - доступны всем */}
      <Tab.Screen
        name="EventsStack"
        component={EventsStack}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity {...props} style={styles.tabItem}>
              <Ionicons
                name="calendar-outline"
                size={24}
                color={props.accessibilityState?.selected ? '#d39a6a' : '#999999'}
              />
              <Text style={[
                styles.tabText,
                props.accessibilityState?.selected && styles.tabTextActive
              ]}>
                Мероприятия
              </Text>
            </TouchableOpacity>
          ),
        }}
      />

      {/* Заявки - только для volunteer и admin */}
      {(userRole === 'volunteer' || userRole === 'admin') && (
        <Tab.Screen
          name="Applications"
          component={MyApplicationsScreen}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity {...props} style={styles.tabItem}>
                <Ionicons
                  name="document-text-outline"
                  size={24}
                  color={props.accessibilityState?.selected ? '#d39a6a' : '#999999'}
                />
                <Text style={[
                  styles.tabText,
                  props.accessibilityState?.selected && styles.tabTextActive
                ]}>
                  Заявки
                </Text>
              </TouchableOpacity>
            ),
          }}
        />
      )}

      {/* Организация - только для organizer и admin */}
      {(userRole === 'organizer' || userRole === 'admin') && (
        <Tab.Screen
          name="Organization"
          component={OrganizationApplicationsScreen}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity {...props} style={styles.tabItem}>
                <Ionicons
                  name="people-outline"
                  size={24}
                  color={props.accessibilityState?.selected ? '#d39a6a' : '#999999'}
                />
                <Text style={[
                  styles.tabText,
                  props.accessibilityState?.selected && styles.tabTextActive
                ]}>
                  Организация
                </Text>
              </TouchableOpacity>
            ),
          }}
        />
      )}

      {/* Админ - только для admin */}
      {userRole === 'admin' && (
        <Tab.Screen
          name="AdminStack"
          component={AdminStack}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity {...props} style={styles.tabItem}>
                <Ionicons
                  name="shield-outline"
                  size={24}
                  color={props.accessibilityState?.selected ? '#d39a6a' : '#999999'}
                />
                <Text style={[
                  styles.tabText,
                  props.accessibilityState?.selected && styles.tabTextActive
                ]}>
                  Админ
                </Text>
              </TouchableOpacity>
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    elevation: 0,
    shadowOpacity: 0,
    paddingBottom: 5,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabText: {
    ...typography.caption,
    color: '#999999',
    fontSize: 11,
    marginTop: 2,
  },
  tabTextActive: {
    color: '#d39a6a',
    fontWeight: '500',
  },
});