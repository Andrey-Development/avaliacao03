import React, { useContext, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'; // Import the necessary Firebase auth functions

import { db, app } from './../../firebaseConnection';
import { UserContext } from '../../contexts/AuthContext';

export default function Login({ navigation }) {
    const { loginUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
    const [tasks, setTasks] = useState([]);
    const auth = getAuth(app);

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

            <View style={styles.divButtoms}>
                <Button
                    style={styles.button}
                    title="Acessar"
                    onPress={() => {
                        loginUser({
                            email: email,
                            password: password
                        });
                    }}
                />

                <Button
                    style={styles.button}
                    title="Quero me Cadastrar"
                    onPress={() => navigation.navigate('SignUp')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3c3c3c',
        flex: 1,
        padding: 10,
    },
    texto: {
        color: '#f1f1fa',
        fontSize: 20
    },
    input: {
        marginBottom: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#c6c6c6',
        height: 45,
        fontSize: 17,
        marginBottom: 12,
    },
    divButtoms: {
        marginTop: 16,
        gap: 12,
    },
    button: {
        color: '#f1f1fa',
        backgroundColor: '#00cbcc',
        marginBottom: 12,
    }
});