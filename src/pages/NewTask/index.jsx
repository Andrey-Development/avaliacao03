import React, { useContext, useState } from "react";
import { Button, Text, TextInput, View } from 'react-native';

import { UserContext } from "../../contexts/AuthContext";
import styles from './styles';

function NewTask({ navigation }) {
    const { createTask } = useContext(UserContext);
    const [nome, setNome] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Nome</Text>
            <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                onChangeText={(texto) => setNome(texto)}
                value={nome}
            />

            <Button
                style={styles.button}
                title="Cadastrar"
                onPress={() => {
                    createTask(nome);
                }}
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
