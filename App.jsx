import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App(){

  return(
    <View style={styles.container}>
      <Text style={styles.texto}>Teste</Text>
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
  }
});