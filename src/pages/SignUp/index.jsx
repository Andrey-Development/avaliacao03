import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { push, ref } from 'firebase/database';
 // Import the necessary Firebase auth functions

import { db, app } from './../../firebaseConnection';

export default function SignUp({ navigation }) {
    const [user, setUser] = useState({
        nome: ''
        ,email: ''
    });
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    async function cadastrar() {
        const auth = getAuth(app);
        try {
            await createUserWithEmailAndPassword(auth, user.email, password);
            push(ref(db, '/usuarios'), user);
            alert('Usuario criado: ' + user.nome);
        } catch (error) {
            if (error.code === 'auth/weak-password') {
                alert('Sua senha deve ter pelo menos 6 caracteres');
            } else if (error.code === 'auth/invalid-email') {
                alert('Email inválido');
            } else {
                alert('Ops, algo deu errado: ' + error.message);
            }
        }

        // setUser({
        //     nome: ''
        //     ,email: ''
        // });
        // setPassword('');
        setConfirmPassword('');
    }

    function addNewUser() {
        push(ref(db, '/usuarios'), {
            nome: 'felipe',
            idade: 33,
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Nome</Text>
            <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                onChangeText={(texto) => setUser({...user, nome: texto})}
                value={user.nome}
            />

            <Text style={styles.texto}>Email</Text>
            <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                onChangeText={(texto) => setUser({...user, email: texto})}
                value={user.email}
            />

            <Text style={styles.texto}>Senha</Text>
            <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                onChangeText={(texto) => setPassword(texto)}
                value={password}
            />

            <Button 
                title="Cadastrar" 
                onPress={cadastrar} 
            />

            <Button
                title="Já possuo cadastro"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        gap: 8,
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
        fontSize: 17,
    }
});