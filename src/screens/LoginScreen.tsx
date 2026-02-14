import { View, TextInput, StyleSheet, Text } from 'react-native';
import Page from '../components/layout/Page';
import PrimaryButton from '../components/ui/PrimaryButton';
import { colors } from '../theme/colors';
import { radius } from '../theme/radius';


export default function LoginScreen({ navigation }) {
return (
<Page>
<Text style={styles.title}>Авторизация</Text>


<TextInput placeholder="Email" style={styles.input} />
<TextInput placeholder="Пароль" secureTextEntry style={styles.input} />
    <PrimaryButton
title="Войти"
onPress={() => navigation.replace('App', {
  screen: 'DashboardStack',
  params: {
    screen: 'Dashboard'
  }
})
}
/>
</Page>
);
}


const styles = StyleSheet.create({
title: {
fontSize: 24,
fontWeight: '600',
marginBottom: 20
},
input: {
backgroundColor: '#fff',
padding: 14,
borderRadius: radius.lg,
marginBottom: 12,
borderWidth: 1,
borderColor: colors.gray200
}
});