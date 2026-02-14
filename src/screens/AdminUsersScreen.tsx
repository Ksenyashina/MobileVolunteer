import { View, Text, StyleSheet, FlatList } from 'react-native';
import Page from '../components/layout/Page';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

const initialUsers = [
  { id: '1', name: 'Иван', role: 'user' },
  { id: '2', name: 'Анна', role: 'organization' }
];

export default function AdminUsersScreen() {

  const [users, setUsers] = useState(initialUsers);

  const changeRole = (id, newRole) => {
    setUsers(prev =>
      prev.map(u =>
        u.id === id ? { ...u, role: newRole } : u
      )
    );
  };

  return (
    <Page>

      <Text style={styles.title}>Управление пользователями</Text>

      <FlatList
        data={users}
        keyExtractor={u => u.id}
        renderItem={({ item }) => (

          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>

            <Picker
              selectedValue={item.role}
              onValueChange={(value) => changeRole(item.id, value)}
            >
              <Picker.Item label="User" value="user" />
              <Picker.Item label="Organization" value="organization" />
              <Picker.Item label="Admin" value="admin" />
            </Picker>

          </View>

        )}
      />

    </Page>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12
  },
  name: { fontWeight: '600' }
});
