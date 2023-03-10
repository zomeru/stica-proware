import React from 'react';
import { Image, Pressable, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { useUser } from '../contexts/UserContext';

import useAuth from '../hooks/useAuth';

export default function HomeScreen({ navigation }: any) {
  const { logout } = useAuth();

  const { user } = useUser();

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
      <Text style={styles.screenTitle}>Full name: {user.fullName}</Text>
      <Text style={styles.screenTitle}>Student ID: {user.studentId}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CreateAppointment')}
      >
        <Text style={styles.textCenter}>Create Appointment</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ViewAppointment')}
      >
        <Text style={styles.textCenter}>View Appointment</Text>
      </TouchableOpacity>

      <Pressable
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 50,
        }}
        onPress={() => logout()}
      >
        <Text
          style={{
            textAlign: 'center',
            color: '#30A9DE',
            fontSize: 20,
          }}
        >
          Logout
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
    fontWeight: '500',
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
    marginVertical: 10,
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
