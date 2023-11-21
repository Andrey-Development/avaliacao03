import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { UserContext } from "../contexts/AuthContext";
import { db, app } from './../firebaseConnection';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

function Routes() {
    const { signed } = useContext(UserContext);
    const [user, setUser] = useState(null);
    const auth = getAuth(app);

    return (
        <NavigationContainer>
            {
                signed ? <AppRoutes /> : <AuthRoutes />
            }
        </NavigationContainer>
    )
}

export default Routes

