import React from 'react';
import { View } from 'react-native';
import { UserProvider } from './src/contexts/AuthContext';
import Routes from './src/routes';

export default function App() {
  return (
    <UserProvider>
      <View style={{ flex: 1, paddingTop: 32 }}>
        <Routes />
      </View>
    </UserProvider>
  );
}
