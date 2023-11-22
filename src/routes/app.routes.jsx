import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';
import NewTask from '../pages/NewTask';

const Stack = createNativeStackNavigator();

function AppRoutes() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen 
                name="Home" 
                component={Home} 
                options={{ 
                    title: 'Lista de Tarefas',
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
                name="NewTask" 
                component={NewTask} 
                options={{ 
                    title: 'Tarefa',
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

export default AppRoutes;
