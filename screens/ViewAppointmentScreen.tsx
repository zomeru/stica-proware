import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { useUser } from '../contexts/UserContext';

export default function ViewAppointmentScreen({ navigation }: any) {
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
      <Text style={styles.title}>View Appointment</Text>
      <Text style={styles.screenTitle}>Full name: {user.fullName}</Text>
      <Text style={styles.screenTitle}>Student ID: {user.studentId}</Text>

      <Pressable
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 50,
        }}
        onPress={() => navigation.goBack()}
      >
        <Text
          style={{
            textAlign: 'center',
            color: '#30A9DE',
            fontSize: 20,
          }}
        >
          Go back
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
