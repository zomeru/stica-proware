import React, { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from '@env';

import { Text, View } from '../components/Themed';
import useAuth from '../hooks/useAuth';

export default function LoginScreen({ navigation }: any) {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [confirmPassword, onChangeConfirmPassword] = useState('');

  const { register } = useAuth();

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
      <Text style={styles.screenTitle}>Register</Text>
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
      <TextInput
        style={styles.input}
        onChangeText={onChangeConfirmPassword}
        value={confirmPassword}
        placeholder='Confirm password'
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => register(email, password, confirmPassword)}
      >
        <Text style={styles.textCenter}>Register</Text>
      </TouchableOpacity>
      <Pressable
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 50,
        }}
        onPress={() => navigation.navigate('Login')}
      >
        <Text
          style={{
            color: '#707070',
            textAlign: 'center',
            marginRight: 5,
          }}
        >
          Already have an account?
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: '#30A9DE',
          }}
        >
          Log in
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
