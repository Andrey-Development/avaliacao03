import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db, app } from './../firebaseConnection';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

function Routes() {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);

    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return subscriber;
    }, []);
    return (
        <NavigationContainer>
            {
                user ? <AppRoutes /> : <AuthRoutes />
            }
        </NavigationContainer>
    )
}

export default Routes

