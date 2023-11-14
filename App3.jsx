import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, ActivityIndicator} from 'react-native';

import { signInWithEmailAndPassword, signOut, getAuth } from 'firebase/auth'; // Import the necessary Firebase auth functions

import {db, app} from './src/firebaseConnection';

export default function App(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const auth = getAuth(app); // Get the Auth object from your Firebase connection


  async function logar(){
    await signInWithEmailAndPassword(auth, email, password)
    .then( (value) => {
      alert('Bem-vindo: ' + value.user.email);
      setUser(value.user.email);
    })
    .catch( (error) => {
        console.log(error);
        return;
    })

    setEmail('');
    setPassword('');
  }


  async function logout(){
    await signOut(auth);
    setUser('');
    alert('Deslgoado com sucesso!');
  }

  return(
    <View style={styles.container}>
      <Text style={styles.texto}>Email</Text>
      <TextInput
      style={styles.input}
      underlineColorAndroid="transparent"
      onChangeText={(texto) => setEmail(texto) }
      value={email}
      />

      <Text style={styles.texto}>Senha</Text>
      <TextInput
      style={styles.input}
      underlineColorAndroid="transparent"
      onChangeText={(texto) => setPassword(texto) }
      value={password}
      />

      <Button
      title="Acessar"
      onPress={logar}
      />

        <Text style={{marginTop: 20, marginBottom: 20, fontSize: 23, textAlign: 'center'}}>
          {user}
        </Text>

      {user.length > 0 ? 
      (
        <Button
        title="Deslogar"
        onPress={logout}
        />
      ) : 
      (
        <Text style={{marginTop: 20, marginBottom: 20, fontSize: 23, textAlign: 'center'}}>
          Nenhum usuario esta logado
        </Text>
      )}



    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    margin: 10,
  },
  texto: {
    fontSize: 20,
  },
  input:{
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#121212',
    height: 45,
    fontSize: 17
  }
});