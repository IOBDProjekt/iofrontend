import React, { createContext, useState, useContext } from "react";

import api from "../api";

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [refreshFavourites, setRefreshFavourites] = useState(() => () => {});

    const loginUser = (userData) => {
        setUser(userData);
    };

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem("authToken");
    };

    const isUserLoggedIn = () => {
        if (localStorage.getItem("authToken")) return true;
        else return false;
    };

    const fetchUserRole = async () => {
        try {
            const response = await api.get("/auth/me");
            const fetchedRole = response?.data?.role;
            setRole(fetchedRole);
            return fetchedRole;
        } catch (error) {
            setRole(null);
        }
    };

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                loginUser,
                logoutUser,
                isUserLoggedIn,
                refreshFavourites,
                setRefreshFavourites,
                fetchUserRole,
                role,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
