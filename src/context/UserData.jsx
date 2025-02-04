import { createContext, useState } from "react";

export const UserData = createContext();

export function UserDataProvider({ children }) {
    const [user, setUser] = useState({
        email: "",
        isAuthenticated: false,
    });

    return (
        <UserData.Provider value={{ user, setUser }}>
            {children}
        </UserData.Provider>
    );
}