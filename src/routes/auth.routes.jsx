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
                options={{
                    title: 'Entrar',
                    headerStyle: {
                        backgroundColor: '#2a2a2a',
                    },
                    headerTintColor: '#f1f1fa',
                    statusBarColor: '#2a2a2a',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 28,
                    },
                }}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                    title: 'Novo Cadastro',
                    headerStyle: {
                        backgroundColor: '#2a2a2a',
                    },
                    headerTintColor: '#f1f1fa',
                    statusBarColor: '#2a2a2a',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 28,
                    },
                }}
            />
        </Stack.Navigator>
    )
}

export default AuthRoutes;
