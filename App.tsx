// App.tsx

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen'; // 1. Importe sua nova tela

export default function App() {
  // 2. O App agora tem um estado para controlar se o usuário está logado.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 3. Esta é a função que será passada para a LoginScreen.
  // Quando chamada, ela atualiza o estado do App.
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 4. Renderização Condicional: */}
      {/* Se isLoggedIn for true, mostra a HomeScreen. */}
      {/* Se for false, mostra a LoginScreen e passa a função para ela. */}
      {isLoggedIn ? (
        <HomeScreen />
      ) : (
        <LoginScreen onLogin={handleLoginSuccess} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});