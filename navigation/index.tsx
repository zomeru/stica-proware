import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { UserProvider, useUser } from '../contexts/UserContext';
import CreateAppointmentScreen from '../screens/CreateAppointmentScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';

import RegisterScreen from '../screens/RegisterScreen';
import ViewAppointmentScreen from '../screens/ViewAppointmentScreen';

import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation() {
  return (
    <UserProvider>
      <NavigationContainer
        linking={LinkingConfiguration}
        // theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <RootNavigator />
      </NavigationContainer>
    </UserProvider>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { user } = useUser();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Group>
          <Stack.Screen
            name='Home'
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='CreateAppointment'
            component={CreateAppointmentScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='ViewAppointment'
            component={ViewAppointmentScreen}
            options={{ headerShown: false }}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Register' component={RegisterScreen} />
          <Stack.Screen
            name='ForgotPassword'
            component={ForgotPasswordScreen}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
