import { Button, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import useAuth from '../hooks/useAuth';

export default function HomeScreen({ navigation }: any) {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You are logged in</Text>
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      <Button title='Log out' onPress={() => logout()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
