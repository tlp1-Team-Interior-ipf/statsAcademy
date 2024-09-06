import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    console.log("User in PrivateRoute:", user);
    return user.isLogged === true ? children : <Navigate to="/login" />;
};