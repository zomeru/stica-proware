import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';

import { Text, View } from '../components/Themed';
import { useUser } from '../contexts/UserContext';
import { collection, orderBy, query, where } from 'firebase/firestore';
import { db } from '../utils/database';
import { useCol } from '../services/firestore';
import { dateFormatter } from '../utils/date';
interface Appointment {
  id: string;
  userId: string;
  fullName: string;
  studentId: string;
  appointmentDate: any;
  createdAt: any;
}

export default function CreateAppointmentScreen({ navigation }: any) {
  const { user } = useUser();
  const [appointments, loading] = useCol<Appointment>(
    query(
      collection(db, 'appointments'),
      where('userId', '==', user.id),
      orderBy('createdAt', 'desc')
    )
  );

  console.log('appointments', appointments);

  const renderItem = ({ item }: { item: Appointment }) => {
    return (
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 10,
          backgroundColor: '#406eb3',
          marginBottom: 10,
        }}
      >
        <Text>{dateFormatter(item.appointmentDate.toDate())}</Text>
      </View>
    );
  };

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
      <Text style={styles.screenTitle}>Full name: {user.fullName}</Text>
      <Text style={styles.screenTitle}>Student ID: {user.studentId}</Text>
      <Text style={styles.title}>View Appointment</Text>
      <ScrollView
        style={{
          height: 30,
          width: '80%',
        }}
      >
        {/* <FlatList
          style={{
            width: '100%',
          }}
          data={appointments}
          renderItem={renderItem}
          keyExtractor={appointment => appointment.id}
        /> */}
        {appointments &&
          appointments.map((appointment, i) => {
            return (
              <View
                key={appointment.id}
                style={{
                  marginHorizontal: 10,
                  display: 'flex',
                  flexDirection: 'row',
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  backgroundColor: '#3081b6',
                  marginBottom: 10,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    marginRight: 10,
                  }}
                >
                  {i + 1}.
                </Text>
                <Text>
                  {dateFormatter(appointment.appointmentDate.toDate())}
                </Text>
              </View>
            );
          })}
      </ScrollView>

      <Pressable
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
        onPress={() => navigation.goBack()}
      >
        <Text
          style={{
            textAlign: 'center',
            color: '#30A9DE',
            fontSize: 20,
            marginBottom: 20,
            marginTop: 10,
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
    // justifyContent: 'center',
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
    color: '#fff',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  btn: {
    backgroundColor: '#30A9DE',
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: 5,
    marginBottom: 5,
  },
});
