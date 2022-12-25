import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateCurrentUser,
} from 'firebase/auth';
import Toast from 'react-native-toast-message';

import { auth, db } from '../utils/database';
import { UserDoc, useUser } from '../contexts/UserContext';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

function validMail(mail: string) {
  return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
    mail
  );
}

const useAuth = () => {
  const { setUser } = useUser();

  const [hasResetError, setHasResetError] = useState(false);

  const defaultErrMessage = 'Something went wrong! Please try again.';

  const login = (email: string, password: string) => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Username and password are required',
      });
      return;
    }

    const trimmedEmail = email.trim();

    signInWithEmailAndPassword(auth, `${trimmedEmail}`, password.trim())
      .then(async userCredential => {
        if (userCredential) {
          const q = query(
            collection(db, 'users'),
            where('email', '==', trimmedEmail)
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userDoc = {
              id: querySnapshot.docs[0].id,
              ...querySnapshot.docs[0].data(),
            } as UserDoc;
            setUser(userDoc);
          }
        }
      })
      .catch(loginError => {
        const errorMessage = loginError.message;

        if (
          errorMessage.includes('user-not-found') ||
          errorMessage.includes('invalid-email')
        ) {
          Toast.show({
            type: 'error',
            text1: 'Invalid email or password',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: defaultErrMessage,
          });
        }
      });
  };

  const register = ({
    email,
    studentId,
    fullName,
    password,
    confirmPassword,
  }: {
    email: string;
    studentId: string;
    fullName: String;
    password: string;
    confirmPassword: string;
  }) => {
    if (!email || !password || !confirmPassword || !studentId || !fullName) {
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
      .then(async userCredential => {
        const { user } = userCredential;
        const userId = user?.uid;

        const userObj = {
          uid: userId,
          email: trimmedEmail,
          studentId,
          fullName,
        } as UserDoc;

        const newUser = await addDoc(collection(db, 'users'), userObj);
        userObj.id = newUser.id;

        setUser(userObj);
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

  const resetPassword = (email: string) => {
    if (!email) {
      Toast.show({
        type: 'error',
        text1: 'Email is required',
      });
      setHasResetError(true);
      return;
    }

    if (!validMail(email)) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a valid email',
      });
      setHasResetError(true);
      return;
    }

    const trimmedEmail = email.trim();
    sendPasswordResetEmail(auth, trimmedEmail)
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Password reset email sent',
        });
        console.log('reset success');
        setHasResetError(false);
      })
      .catch(error => {
        console.log('reset error', error.message);
        if (error.message.includes('user-not-found')) {
          Toast.show({
            type: 'success',
            text1: 'Password reset email sent',
          });
          setHasResetError(false);
          return;
        }

        Toast.show({
          type: 'error',
          text1: defaultErrMessage,
        });
        setHasResetError(true);
      });
  };

  const logout = () => {
    auth.signOut();
    setUser(null as unknown as UserDoc);
  };

  return {
    login,
    register,
    resetPassword,
    hasResetError,
    logout,
  };
};

export default useAuth;
