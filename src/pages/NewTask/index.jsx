import React, { UserContext, useState } from "react";
import { Button, Text, TextInput, View } from 'react-native';

import styles from './styles';

function NewTask({ navigation }) {
    const { createTask, task, setTask } = useContext(UserContext);

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
