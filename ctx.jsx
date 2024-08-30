import { useContext, createContext } from 'react';
import { useStorageState } from './useStorageState.jsx';

const AuthContext = createContext();


// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }
  return value;
}


export function SessionProvider({ children }) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: async (username, password) => {

          try {
            const response = await
            fetch('http://10.0.2.2:3000/user/login', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: username,
                password: password,
              }),
            })
            
            if(response.ok){
              const cookies = response.headers.get('set-cookie');

              setSession(["session", cookies]);
  
              return 
            }
            const data = await response.json() 

            if (!response.ok) throw new Error(data.failureMsg)
            


          } catch (error) {
            // console.log(error)
            return { failure: true, message: error}
            
          }
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>

      {children}
      
    </AuthContext.Provider>
  );
}
