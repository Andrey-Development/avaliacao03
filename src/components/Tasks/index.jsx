import React from 'react'
import { Text, View } from 'react-native'

export default function FlatTasks(data) {
    const date = Date();
  return (
    <View key={data.id}>
        <Text>{`ID: ${userId}`}</Text>
        <Text>{`Nome: ${data.nome}`}</Text>
        <Text>{`Data de Finalização: ${date}`}</Text>
        <Text>{`Data Final: ${date}`}</Text>
    </View>
  )
}
