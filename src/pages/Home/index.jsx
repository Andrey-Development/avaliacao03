import React, { useState, useLayoutEffect } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { signOut, getAuth } from 'firebase/auth';
import { ref, onValue, push, remove, update } from 'firebase/database';
import { db, app } from './../../firebaseConnection';

import styles from './styles';

export default function Home({ navigation }) {
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState({
        nome: ''
        , finalizada: Date()
        , dataFinal: Date()
    });
    const auth = getAuth(app);

    async function logout() {
        await signOut(auth);
        setTasks([]);
        alert('Deslgoado com sucesso!');
    }

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

    // function updateUser(userKey) {
    //     const userRef = ref(db, `/usuarios/${userKey}`);
    //     update(userRef, {
    //         nome: 'felipe 124',
    //         // Outros campos que deseja atualizar, se houver
    //     });
    // }

    // function clearUser(userKey) {
    //     const userRef = ref(db, `/usuarios/${userKey}`); // Substitua 'seu_nodo' pelo caminho correto
    //     remove(userRef)
    //         .then(() => {
    //             console.log(`Usuário com chave ${userKey} removido com sucesso.`);
    //         })
    //         .catch((error) => {
    //             console.error(`Erro ao remover o usuário: ${error}`);
    //         });
    // }

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

    // const fetchUser = async (userKey) => {
    //     try {
    //         onValue(ref(db, `/usuarios/${userKey}`), (querySnapShot) => {
    //             const userData = querySnapShot.val() || {};
    //             console.log('Dados do usuário: ', userData);
    //             setLoading(false);
    //         });

    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //         setLoading(false);
    //     }
    // };

    useLayoutEffect(() => {
        fetchTasks();
    }, []);

    return (
        <View style={styles.container}>
            <Button
                style={styles.button}
                title="Sair"
                onPress={logout}
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