import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Animated
} from 'react-native';

import { useEffect, useRef } from 'react';

import Page from '../components/layout/Page';
import PrimaryButton from '../components/ui/PrimaryButton';
import { typography } from '../theme/typography';
import { colors } from '../theme/colors';
import StatCard from '../components/cards/StatCard';
import EventCard from '../components/cards/EventCard';
import RuleCard from '../components/cards/RuleCard';

export default function PublicScreen({ navigation }) {

  // ✅ hooks должны быть здесь
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <Page>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HERO */}
        <View style={styles.hero}>
          <Text style={styles.title}>Волонтёрская платформа</Text>
          <Text style={styles.subtitle}>
            Найдите мероприятия, помогайте обществу и становитесь частью
            активного сообщества волонтёров.
          </Text>

          <PrimaryButton
            title="Присоединиться"
            onPress={() => navigation.navigate('Auth')}
          />
        </View>

        {/* СТАТИСТИКА */}
        <Text style={styles.sectionTitle}>Статистика платформы</Text>

        <View style={styles.statsGrid}>
          <StatCard number="10k+" label="Активных волонтёров" />
          <StatCard number="500+" label="Успешных мероприятий" />
          <StatCard number="50+" label="Городов присутствия" />
          <StatCard number="100+" label="Партнёров платформы" />
        </View>

        {/* О ПЛАТФОРМЕ */}
        <Text style={styles.sectionTitle}>О платформе</Text>

        <Text style={styles.text}>
          Платформа объединяет волонтёров, организаторов и сообщества
          для реализации социальных инициатив. Мы помогаем находить
          мероприятия, координировать участие и развивать культуру
          добровольчества в разных регионах.
        </Text>

        {/* АКТУАЛЬНЫЕ СОБЫТИЯ */}
        <Text style={styles.sectionTitle}>Актуальные события</Text>

        <EventCard
          title="Помощь приюту животных"
          image={require('../../assets/event1.png')}
        />

        <EventCard
          title="Экологическая уборка парка"
          image={require('../../assets/event2.png')}
        />

        <PrimaryButton
          title="Смотреть все мероприятия"
          onPress={() => navigation.navigate('App', {
  screen: 'EventsStack',
  params: {
    screen: 'Events'
  }
})}
        />

        {/* ПРАВИЛА СООБЩЕСТВА */}
        <Text style={styles.sectionTitle}>Правила сообщества</Text>

        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.rulesGrid}>

            <RuleCard
              icon="favorite"
              accent="#FF6B6B"
              title="Взаимоуважение"
              description="Мы ценим каждого участника и поддерживаем атмосферу доверия и уважения."
            />

            <RuleCard
              icon="verified"
              accent="#4CAF50"
              title="Ответственность"
              description="Серьезный подход к взятым обязательствам - основа нашей работы."
            />

            <RuleCard
              icon="security"
              accent="#3F51B5"
              title="Безопасность"
              description="Мы строго следим за безопасностью данных и мероприятий."
            />

          </View>
        </Animated.View>

      </ScrollView>
    </Page>
  );
}

const styles = StyleSheet.create({

  hero: {
    marginBottom: 30
  },

  title: {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: 10
  },

  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: 20
  },

  sectionTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginTop: 30,
    marginBottom: 10
  },

  text: {
    ...typography.body,
    color: colors.textSecondary
  },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },

  statCard: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    width: '48%'
  },

  statNumber: {
    ...typography.h2,
    color: colors.accent
  },

  statLabel: {
    ...typography.body,
    color: colors.textSecondary
  },

  eventCard: {
    marginBottom: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: 'hidden'
  },

  eventImage: {
    width: '100%',
    height: 140
  },

  eventTitle: {
    padding: 12,
    ...typography.body,
    color: colors.textPrimary
  },

  rules: {
    gap: 6,
    marginBottom: 40
  },

  rule: {
    ...typography.body,
    color: colors.textSecondary
  },

  // ✅ тут не хватало запятой раньше
  rulesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 30
  }

});
