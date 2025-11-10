import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native'; // Removido StyleSheet
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen'; 
import RegistroScreen from './screens/registerscreen'; 
import { initDatabase } from './dbService';
import { styles } from './AppStyles'; // 👈 Importa o estilo

type AuthMode = 'login' | 'register' | 'home';

export default function App() {
  const [authMode, setAuthMode] = useState<AuthMode>('login'); 
  const [dbIsReady, setDbIsReady] = useState(false);

  // Funções de navegação
  const goToHome = () => setAuthMode('home');
  const goToRegister = () => setAuthMode('register');
  const goToLogin = () => setAuthMode('login');

  // Inicialização do DB na montagem
  useEffect(() => {
    initDatabase()
      .then(() => setDbIsReady(true))
      .catch(error => console.error("Falha na inicialização do DB:", error));
  }, []);

  if (!dbIsReady) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando dados do aplicativo...</Text> 
      </View>
    );
  }

  const renderScreen = () => {
    switch (authMode) {
      case 'home':
        return <HomeScreen />;
      case 'register':
        return <RegistroScreen onRegisterSuccess={goToLogin} />; 
      case 'login':
      default:
        return (
          <LoginScreen 
            onLogin={goToHome} 
            onNavigateToRegister={goToRegister}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderScreen()}
    </SafeAreaView>
  );
}
// Removido todo o bloco de StyleSheet.create