import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const loginUser = (userData) => {
        setUser(userData);
    };

    const logoutUser = () => {
        setUser(null);
    };

    const isUserLoggedIn = () => {
        if (localStorage.getItem("authToken")) return true;
        else return false;
    };

    return <UserContext.Provider value={{ user, setUser, loginUser, logoutUser, isUserLoggedIn }}>{children}</UserContext.Provider>;
};
