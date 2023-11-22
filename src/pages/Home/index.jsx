import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, ScrollView, TouchableOpacity } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from 'firebase/database';
import { IoIosAdd } from "react-icons/io";
import { app, db } from './../../firebaseConnection';

import styles from './styles';
import { UserContext } from "../../contexts/AuthContext";

export default function Home({ navigation }) {
    const auth = getAuth(app);
    const { loading, setLoading, logOut } = useContext(UserContext);
    const [taskFiltered, setTaskFiltered] = useState(null);
    const [tasks, setTasks] = useState(null);
    const [userId, setUserId] = useState(null);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            await onAuthStateChanged(auth, ({ uid }) => setUserId(uid));
            await onValue(ref(db, `tasks/`), snapshot => {
                const dataTasks = snapshot.val() ? Object.entries(snapshot.val()) : null;
                if (dataTasks !== null) {
                    const newTasks = [];
                    dataTasks.filter(([id, task]) => {
                        if (task.usuario_id == userId) {
                            newTasks.push({ id: id, nome: task.nome });
                        }
                    });
                    setTasks(newTasks);
                }
            });
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            fetchTasks();
        }, 1000);
    }, []);

    return (
        <View style={styles.container}>
            <Button
                style={styles.button}
                title="Sair"
                onPress={() => logOut()}
            />
            <View style={styles.divCards}>
                <ScrollView style={styles.divScroll}>
                    {tasks ? (
                        tasks.map((task) => (
                            <View style={styles.card} key={task.id}>
                                <View style={styles.headerCard}>
                                    <Text style={styles.titleCard}>{`${task.nome}`}</Text>
                                    <Text>{`Remover`}</Text>
                                </View>
                                <View style={styles.bodyCard}>
                                    <Text style={styles.labelCard}>{`Data final: `}</Text>
                                    <Text style={styles.textCard}>{`${task.nome}`}</Text>
                                </View>
                                <View style={styles.footerCard}>
                                    <Button
                                        style={styles.btnFinalizar}
                                        title="Finalizar tarefa"
                                        onPress={() => { console.log("finalizar") }}
                                    />
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text>Nenhuma tarefa cadastrada!</Text>
                    )}
                </ScrollView>

                <TouchableOpacity
                    onPress={() => navigation.navigate('NewTask')}
                    style={styles.btnFloat}
                >
                    <IoIosAdd />
                </TouchableOpacity>
            </View>
        </View>
    );
}
