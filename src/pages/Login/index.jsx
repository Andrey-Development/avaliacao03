import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'; // Import the necessary Firebase auth functions

import { db, app } from './../../firebaseConnection';

export default function Login({navigation}) {
    // const navigation = createNativeStackNavigator();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
    const [tasks, setTasks] = useState([]);
    const auth = getAuth(app);

    async function logar() {
        // await signInWithEmailAndPassword(auth, email, password)
        await signInWithEmailAndPassword(auth, 'nandreyout@gmail.com', 'Teste123')
            .then((value) => {
                alert('Bem-vindo: ' + value.user.email);
                setUser(value.user.email);
            })
            .catch((error) => {
                console.log(error);
                return;
            });

        setEmail('');
        setPassword('');
        setTasks([{"id": 1, "nome": "task 1", "descricao": "descricao da task 1"}]);
    }

    async function logout() {
        await signOut(auth);
        setUser('');
        setTasks([]);
        alert('Deslgoado com sucesso!');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Email</Text>
            <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                onChangeText={(texto) => setEmail(texto)}
                value={email}
            />

            <Text style={styles.texto}>Senha</Text>
            <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                onChangeText={(texto) => setPassword(texto)}
                value={password}
            />

            <Button
                style={styles.button}
                title="Acessar"
                onPress={logar}
            />

            <Button
                style={styles.button}
                title="Quero me Cadastrar"
                onPress={() => navigation.navigate('SignUp')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        gap: 10,
    },
    texto: {
        fontSize: 20,
    },
    input: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#121212',
        height: 45,
        fontSize: 17
    },
    button: {
        marginBottom: 8,
    }
});