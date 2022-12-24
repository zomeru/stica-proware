import { useEffect, useState } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import Toast from 'react-native-toast-message';

import { auth } from '../utils/database';
import { useUser } from '../contexts/UserContext';

function validMail(mail: string) {
  return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
    mail
  );
}

const useAuth = () => {
  const { setUser } = useUser();

  const defaultErrMessage = 'Something went wrong! Please try again.';

  const login = (email: string, password: string) => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Username and password are required',
      });
      return;
    }

    signInWithEmailAndPassword(auth, `${email.trim()}`, password.trim())
      .then(userCredential => {
        const { user } = userCredential;
        setUser(user);
        // router.push('/dashboard');
      })
      .catch(loginError => {
        const errorMessage = loginError.message;

        if (
          errorMessage.includes('user-not-found') ||
          errorMessage.includes('invalid-email')
        ) {
          Toast.show({
            type: 'error',
            text1: 'Invalid username or password',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: defaultErrMessage,
          });
        }
      });
  };

  const register = (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    if (!email || !password || !confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'All fields are required',
      });
      return;
    }

    const trimmedEmail = email.trim();

    const emailValid = validMail(trimmedEmail);

    console.log('emailValid', emailValid);

    if (!emailValid) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a valid email',
      });
      return;
    }

    if (password.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Password must be at least 6 characters',
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Passwords do not match',
      });
      return;
    }

    createUserWithEmailAndPassword(auth, `${trimmedEmail}`, password.trim())
      .then(userCredential => {
        const { user } = userCredential;
        setUser(user);
        // router.push('/dashboard');
      })
      .catch(registerError => {
        const errorMessage = registerError.message;

        console.log('errorMessage', errorMessage);

        if (errorMessage.includes('email-already-in-use')) {
          Toast.show({
            type: 'error',
            text1: 'Email already exists',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: defaultErrMessage,
          });
        }
      });
  };

  const logout = () => {
    auth.signOut();
    setUser(null as unknown as User);
  };

  return {
    login,
    register,
    logout,
  };
};

export default useAuth;
