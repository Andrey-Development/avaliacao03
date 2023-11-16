import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';

export default function App() {
  return (
    <View style={{ flex: 1, paddingTop: 32 }}>
      <Routes />
    </View>
  );
}
