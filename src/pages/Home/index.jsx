import React, { useContext, useEffect } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { getAuth } from 'firebase/auth';
import { ref, onValue, push, remove, update } from 'firebase/database';
import { db, app } from './../../firebaseConnection';

import styles from './styles';
import { UserContext } from "../../contexts/AuthContext";

export default function Home({ navigation }) {
    const { loading, tasks, fetchTasks, signOut } = useContext(UserContext);

    useEffect(() => {
        fetchTasks();
        setTimeout(() => {
            console.log('tasks: ' + tasks);
        }, 1500);
    }, []);

    return (
        <View style={styles.container}>
            <Button
                style={styles.button}
                title="Sair"
                onPress={signOut}
            />
            {
                loading ? (
                    <Text>Carregando...</Text>
                ) : (
                    <View>
                        <Button
                            style={styles.button}
                            title="Nova Tarefa"
                            onPress={() => navigation.navigate('NewTask')}
                        />
                        {tasks ? (
                            tasks.map(([id, task]) => (
                                <View key={id}>
                                    <Text>{`Nome: ${task.nome}`}</Text>
                                </View>
                            ))
                        ) : (
                            <Text>Nenhuma tarefa cadastrada!</Text>
                        )}
                    </View>
                )}
        </View>
    );
}