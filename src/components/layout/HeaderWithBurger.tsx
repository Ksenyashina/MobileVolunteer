import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BurgerMenu from '../../navigation/tabs/BurgerMenu';
import { typography } from '../../theme/typography';
import { colors } from '../../theme/colors';

interface Props {
  navigation: any;
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  userEmail?: string | null;
  onAboutPress?: () => void;
  onRulesPress?: () => void;
  onContactsPress?: () => void;
  onStatsPress?: () => void;
}

export default function HeaderWithBurger({
  navigation,
  title,
  showBack = false,
  onBackPress,
  userEmail = null,
  onAboutPress,
  onRulesPress,
  onContactsPress,
  onStatsPress,
}: Props) {
  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        {showBack ? (
          <TouchableOpacity onPress={onBackPress || (() => navigation.goBack())} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#d39a6a" />
          </TouchableOpacity>
        ) : (
          <Text style={styles.logo}>VolonterPlatform</Text>
        )}

        <BurgerMenu
          navigation={navigation}
          userEmail={userEmail}
          onAboutPress={onAboutPress}
          onRulesPress={onRulesPress}
          onContactsPress={onContactsPress}
          onStatsPress={onStatsPress}
        />
      </View>
      {title ? <Text style={styles.headerTitle}>{title}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    ...typography.h2,
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '600',
    marginTop: 4,
  },
});