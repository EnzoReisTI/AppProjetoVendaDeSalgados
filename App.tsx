import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Telas
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import { initDatabase, supabase } from './BancoDeDados';


type ScreenType = 'login' | 'register' | 'home' | 'profile';

export default function App() {
  const [screen, setScreen] = useState<ScreenType>('login');
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const startApp = async () => {
      try {
        await initDatabase();
        
        
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { data } = await supabase
            .from('usuarios')
            .select('*')
            .eq('email', user.email)
            .single();
            
          if (data) {
            setCurrentUser(data);
            setScreen('home');
          }
        }
      } catch (error) {
        console.log("Início limpo (sem usuário logado)");
      } finally {
        setLoading(false);
      }
    };
    startApp();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6600" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        
        {screen === 'login' && (
          <LoginScreen 
            onLogin={(user) => { setCurrentUser(user); setScreen('home'); }} 
            onNavigateToRegister={() => setScreen('register')} 
          />
        )}

        {screen === 'register' && (
          <RegisterScreen 
            onRegisterSuccess={() => setScreen('login')} 
            onBack={() => setScreen('login')} 
          />
        )}

        {screen === 'home' && (
          <HomeScreen 
            user={currentUser}
            onNavigateToProfile={() => setScreen('profile')}
            onLogout={async () => { 
              await supabase.auth.signOut();
              setCurrentUser(null); 
              setScreen('login'); 
            }} 
          />
        )}

        {screen === 'profile' && (
          <ProfileScreen 
            user={currentUser} 
            onBack={() => setScreen('home')} 
            onLogout={() => { setCurrentUser(null); setScreen('login'); }}
          />
        )}

      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});