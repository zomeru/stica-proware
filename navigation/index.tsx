import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { UserProvider, useUser } from '../contexts/UserContext';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';

import RegisterScreen from '../screens/RegisterScreen';

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

  console.log('user', user);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Group>
          <Stack.Screen
            name='Home'
            component={HomeScreen}
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
