import React, { useContext, useState, useLayoutEffect } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { getAuth } from 'firebase/auth';
import { ref, onValue, push, remove, update } from 'firebase/database';
import { db, app } from './../../firebaseConnection';

import styles from './styles';
import { UserContext } from "../../contexts/AuthContext";

export default function Home({ navigation }) {
    const { signOut } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState({
        nome: ''
        , finalizada: Date()
        , dataFinal: Date()
    });
    const auth = getAuth(app);

    async function createTask() {
        try {
            await push(ref(db, '/tasks'), task);
            alert('Tarefa cadastrada com sucesso!');
            setTask({
                nome: ''
                , finalizada: Date()
                , dataFinal: Date()
            });
            fetchTasks();
        } catch (e) {
            alert('erro: ' + e);
        }
    }

    const fetchTasks = async () => {
        try {
            onValue(ref(db, '/tasks'), (querySnapShot) => {
                const tasksData = querySnapShot.val() || {};
                setTasks(tasksData);
            });
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    useLayoutEffect(() => {
        fetchTasks();
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
                            Object.keys(tasks).map((taskId) => (
                                <View key={taskId}>
                                    <Text>{`Nome: ${tasks[taskId].nome}`}</Text>
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