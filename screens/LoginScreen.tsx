import React, { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { Text, View } from '../components/Themed';
import useAuth from '../hooks/useAuth';

export default function LoginScreen({ navigation }: any) {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  const { login } = useAuth();

  return (
    <View style={styles.container}>
      {/* Add logo image */}
      <Image
        style={{
          width: 250,
          height: 250,
        }}
        source={require('../assets/images/logo.jpg')}
      />
      <Text style={styles.title}>Hello! Welcome to STICA Proware</Text>
      <Text style={styles.screenTitle}>Log in</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder='Email'
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder='Password'
        secureTextEntry
      />
      {/* {error && (
        <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
      )} */}
      <Pressable
        style={{
          width: '80%',
          marginBottom: 10,
        }}
      >
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </Pressable>
      <TouchableOpacity
        style={styles.button}
        onPress={() => login(email, password)}
      >
        <Text style={styles.textCenter}>Log in</Text>
      </TouchableOpacity>
      <Pressable
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 50,
        }}
        onPress={() => navigation.navigate('Register')}
      >
        <Text
          style={{
            color: '#707070',
            textAlign: 'center',
            marginRight: 5,
          }}
        >
          Don't have an account?
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: '#30A9DE',
          }}
        >
          Register
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 24,
    width: '80%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 20,
  },
  screenTitle: {
    width: '80%',
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 10,
    fontSize: 18,
    textAlign: 'left',
  },
  input: {
    borderColor: 'black',
    borderWidth: 0.4,
    width: '80%',
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    marginBottom: 10,
  },
  forgotPassword: {
    color: '#707070',
    textAlign: 'right',
  },
  button: {
    backgroundColor: '#3081b6',
    width: '80%',
    textAlign: 'center',
    borderRadius: 5,
    padding: 10,
  },
  textCenter: {
    textAlign: 'center',
    fontSize: 18,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
