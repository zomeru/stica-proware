import React from 'react';
import { Image, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';

import { Text, View } from '../components/Themed';
import { useUser } from '../contexts/UserContext';
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../utils/database';

export default function CreateAppointmentScreen({ navigation }: any) {
  const { user } = useUser();

  const [date, setDate] = React.useState(new Date());
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onChange = (_: DateTimePickerEvent, selectedDate: Date | undefined) => {
    if (selectedDate === undefined) return;
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode: 'date' | 'time') => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: false,
      minimumDate: new Date(),
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const dateFormatter = (date: Date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const dayOfWeek = days[date.getDay()];

    // example format: Dec. 31, 2020 - Fri 12:00 PM (24-hour format)
    return `${months[month - 1]}. ${day}, ${year} - ${dayOfWeek} ${
      hour > 12 ? hour - 12 : hour
    }:${minute < 10 ? '0' + minute : minute} ${hour < 12 ? 'AM' : 'PM'}`;
  };

  const onAppointmentCreate = async () => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'appointments'), {
        createdAt: serverTimestamp(),
        appointmentDate: Timestamp.fromDate(date),
        userId: user.id,
        fullName: user.fullName,
        studentId: user.studentId,
      });
      navigation.goBack();
      Toast.show({
        type: 'success',
        text1: 'Appointment created',
      });
      setIsSubmitting(false);
    } catch (error) {
      console.log('error', error);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong. Please try again.',
      });
      setIsSubmitting(false);
    }
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
      <Text style={styles.title}>Create Appointment</Text>

      {/* <DateTimePicker value={date} /> */}
      <TouchableOpacity onPress={showDatepicker} style={styles.btn}>
        <Text style={styles.textCenter}>Pick Date</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={showTimepicker} style={styles.btn}>
        <Text style={styles.textCenter}>Pick Time</Text>
      </TouchableOpacity>

      <Text
        style={[
          styles.screenTitle,
          {
            marginBottom: 0,
            marginTop: 10,
          },
        ]}
      >
        Selected Date:
      </Text>
      <Text
        style={[
          styles.screenTitle,
          {
            color: '#30A9DE',
          },
        ]}
      >
        {dateFormatter(date)}
      </Text>

      <TouchableOpacity
        disabled={isSubmitting}
        style={styles.button}
        onPress={onAppointmentCreate}
      >
        <Text style={styles.textCenter}>Create Appointment</Text>
      </TouchableOpacity>

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
