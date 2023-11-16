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
                options={{ title: 'Lista de Tarefas' }}
            />
            <Stack.Screen 
                name="NewTask" 
                component={NewTask} 
                options={{ title: 'Tarefa' }}
            />
        </Stack.Navigator>
    )
}

export default AppRoutes;
