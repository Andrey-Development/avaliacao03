import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

const Stack = createNativeStackNavigator();

function AuthRoutes() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen 
                name="Login" 
                component={Login} 
                options={{ title: 'Entrar' }}
            />
            <Stack.Screen 
                name="SignUp" 
                component={SignUp} 
                options={{ title: 'Novo Cadastro' }}
            />
        </Stack.Navigator>
    )
}

export default AuthRoutes;
