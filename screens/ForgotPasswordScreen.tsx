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

export default function ForgotPasswordScreen({ navigation }: any) {
  const [email, onChangeEmail] = useState('');

  const { resetPassword, hasResetError } = useAuth();

  return (
    <View style={styles.container}>
      {/* Add logo image */}
      <Image
        style={{
          width: '80%',
          height: 250,
        }}
        source={require('../assets/images/logo.jpg')}
      />
      <Text style={styles.title}>Hello! Welcome to STICA Proware</Text>
      <Text style={styles.screenTitle}>Reset Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder='Email'
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          resetPassword(email);

          setTimeout(() => {
            if (!hasResetError) {
              onChangeEmail('');
            }
          }, 400);
        }}
      >
        <Text style={styles.textCenter}>Reset Password</Text>
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
          Already reset your password?
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: '#30A9DE',
          }}
        >
          Login
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
