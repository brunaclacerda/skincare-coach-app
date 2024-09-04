import { useContext, createContext, useState } from "react";
import { useStorageState } from "./useStorageState.jsx";

const AuthContext = createContext();
const ENDPOINT = {
  LOGIN: process.env.EXPO_PUBLIC_API_URL + "/user/login",
};

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }
  return value;
}

export function SessionProvider({ children }) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (username, password) => {
          try {
            const response = await fetch(ENDPOINT.LOGIN, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: username,
                password: password,
              }),
            });

            const data = await response.json();

            if (response.ok) {
              const cookies = response.headers.get("set-cookie");
              setUser(data.user);

              setSession(["session", cookies]);

              return;
            }
            console.log(data);

            if (!response.ok) throw new Error(data.failureMsg);
          } catch (error) {
            // console.log(error)
            return { failure: true, message: error };
          }
        },
        signOut: () => {
          setSession(null);
          setUser(null);
        },
        session,
        isLoading,
        user,
        setUserSurvey: () => {
          setUser({ ...user, isNew: false });
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
