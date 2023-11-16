import React, { useState } from "react";
import { Button, Text, TextInput, View } from 'react-native';
import { signOut, getAuth } from 'firebase/auth';
import { ref, onValue, push, remove, update } from 'firebase/database';
import { db, app } from './../../firebaseConnection';

import styles from './styles';

function NewTask({ navigation }) {
    const auth = getAuth(app);
    
    const [task, setTask] = useState({
        nome: ''
        , finalizada: Date()
        , dataFinal: Date()
    });

    async function createTask() {
        try {
            await push(ref(db, '/tasks'), task);
            alert('Tarefa cadastrada com sucesso!');
            setTask({
                nome: ''
                , finalizada: Date()
                , dataFinal: Date()
            });
            alert('Tarefa cadastrada com sucesso!');
            setTask({
                nome: ''
                , finalizada: Date()
                , dataFinal: Date()
            });
        } catch (e) {
            alert('erro: ' + e);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Nome</Text>
            <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                onChangeText={(texto) => setTask({ ...task, nome: texto })}
                value={task.nome}
            />

            <Button
                style={styles.button}
                title="Cadastrar"
                onPress={createTask}
            />

            <Button
                style={styles.button}
                title="Cancelar"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    )
}

export default NewTask;
