import {
  FC,
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../utils/database';
import { collection, getDocs, query, where } from 'firebase/firestore';

export interface UserDoc {
  id: string;
  uid: string;
  email: string;
  studentId: string;
  fullName: string;
}

export interface UserContextProps {
  user: UserDoc;
  setUser: Dispatch<SetStateAction<UserDoc>>;
  loading: boolean;
}

export const UserContext = createContext<UserContextProps>(
  null as unknown as UserContextProps
);

export function useUser() {
  return useContext(UserContext);
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserDoc>(null as unknown as UserDoc);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      if (currentUser) {
        const q = query(
          collection(db, 'users'),
          where('email', '==', currentUser.email)
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

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = useMemo(
    () =>
      ({
        user,
        loading,
        setUser,
      } as UserContextProps),
    [user, loading]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
