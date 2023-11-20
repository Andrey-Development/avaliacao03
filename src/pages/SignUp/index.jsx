import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { UserContext } from '../../contexts/AuthContext';

export default function SignUp({ navigation }) {
    const { createUser } = useContext(UserContext);
    const [user, setUser] = useState({
        nome: ''
        ,email: ''
        ,password: ''
    });

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
                onChangeText={(texto) => setUser({...user, password: texto})}
                value={user.password}
            />

            <Button 
                title="Cadastrar" 
                onPress={() => {
                    createUser(user);
                }} 
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