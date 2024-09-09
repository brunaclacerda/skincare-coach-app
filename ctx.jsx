import { useContext, createContext, useState } from "react";
import { useStorageState } from "./useStorageState.jsx";

const AuthContext = createContext();
const ENDPOINT = {
  LOGIN: process.env.EXPO_PUBLIC_API_URL + "/user/login",
  SIGNUP: process.env.EXPO_PUBLIC_API_URL + "/user/signup",
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
        signUp: async (username, password) => {
          try {
            const response = await fetch(ENDPOINT.SIGNUP, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: username,
                password,
              }),
            });

            if (response.ok) {
              return { success: true };
            }
            const data = await response.json();
            return { failureMsg: data.failureMsg };
          } catch (error) {
            return { failureMsg: error };
          }
        },
        signIn: async (username, password) => {
          console.log(ENDPOINT.LOGIN);

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
            console.log("fetch made");
            const data = await response.json();
            console.log("data");

            if (response.ok) {
              const cookies = response.headers.get("set-cookie");
              setUser(data.user);

              setSession(["session", cookies]);
              return { success: true };
            }

            if (!response.ok) throw new Error(data.failureMsg);
          } catch (error) {
            console.log(error);
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
