import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';

// Импорты стеков (НЕ экранов напрямую)
import DashboardStack from '../stacks/DashboardStack';
import EventsStack from '../stacks/EventsStack';
import AdminStack from '../stacks/AdminStack';
import MyApplicationsScreen from '../../screens/MyApplicationsScreen';
import OrganizationApplicationsScreen from '../../screens/OrganizationApplicationsScreen';

import { typography } from '../../theme/typography';
import { colors } from '../../theme/colors';

const Tab = createBottomTabNavigator();

export default function RoleBasedTabs() {
  const { userRole } = useAuth();

  // Роль user (базовый статус)
  if (userRole === 'user') {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="Cabinet"
          component={DashboardStack}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity {...props} style={styles.tabItem}>
                <Text style={[styles.tabText, props.accessibilityState?.selected && styles.tabTextActive]}>
                  Кабинет
                </Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="Events"
          component={EventsStack}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity {...props} style={styles.tabItem}>
                <Text style={[styles.tabText, props.accessibilityState?.selected && styles.tabTextActive]}>
                  Мероприятия
                </Text>
              </TouchableOpacity>
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  // Роль volunteer (участвует в мероприятиях)
  if (userRole === 'volunteer') {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="Cabinet"
          component={DashboardStack}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity {...props} style={styles.tabItem}>
                <Text style={[styles.tabText, props.accessibilityState?.selected && styles.tabTextActive]}>
                  Кабинет
                </Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="Events"
          component={EventsStack}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity {...props} style={styles.tabItem}>
                <Text style={[styles.tabText, props.accessibilityState?.selected && styles.tabTextActive]}>
                  Мероприятия
                </Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="Applications"
          component={MyApplicationsScreen}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity {...props} style={styles.tabItem}>
                <Text style={[styles.tabText, props.accessibilityState?.selected && styles.tabTextActive]}>
                  Заявки
                </Text>
              </TouchableOpacity>
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  // Роль organizer (создаёт мероприятия)
  if (userRole === 'organizer') {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="Cabinet"
          component={DashboardStack}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity {...props} style={styles.tabItem}>
                <Text style={[styles.tabText, props.accessibilityState?.selected && styles.tabTextActive]}>
                  Кабинет
                </Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="Events"
          component={EventsStack}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity {...props} style={styles.tabItem}>
                <Text style={[styles.tabText, props.accessibilityState?.selected && styles.tabTextActive]}>
                  Мероприятия
                </Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="Organization"
          component={OrganizationApplicationsScreen}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity {...props} style={styles.tabItem}>
                <Text style={[styles.tabText, props.accessibilityState?.selected && styles.tabTextActive]}>
                  Организация
                </Text>
              </TouchableOpacity>
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  // Роль admin (полный доступ)
  if (userRole === 'admin') {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="Cabinet"
          component={DashboardStack}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity {...props} style={styles.tabItem}>
                <Text style={[styles.tabText, props.accessibilityState?.selected && styles.tabTextActive]}>
                  Кабинет
                </Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="Events"
          component={EventsStack}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity {...props} style={styles.tabItem}>
                <Text style={[styles.tabText, props.accessibilityState?.selected && styles.tabTextActive]}>
                  Мероприятия
                </Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="Admin"
          component={AdminStack}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity {...props} style={styles.tabItem}>
                <Text style={[styles.tabText, props.accessibilityState?.selected && styles.tabTextActive]}>
                  Админ
                </Text>
              </TouchableOpacity>
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  // По умолчанию (не авторизован) - показываем только публичные страницы
  return null;
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    elevation: 0,
    shadowOpacity: 0,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  tabText: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 14,
  },
  tabTextActive: {
    color: '#d39a6a',
    fontWeight: '600',
  },
});