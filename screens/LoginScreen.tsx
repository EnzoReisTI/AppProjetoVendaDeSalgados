import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

// 1. ATUALIZAÇÃO DAS PROPS: Adicionamos onNavigateToRegister
type LoginScreenProps = {
  onLogin: () => void;
  onNavigateToRegister: () => void; // Função para ir para a tela de registro
};

// Removemos a importação de 'RegisterScreen' que não era usada aqui.
// import RegisterScreen from '../screens/registerscreen'; 

export default function LoginScreen({ onLogin, onNavigateToRegister }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginPress = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha o e-mail e a senha.");
      return;
    }
  
    try {
      // NOTE: Substitua 'SEU_IP_LOCAL' pelo seu IP ou domínio real
      const response = await fetch('http://SEU_IP_LOCAL:4000/registrar-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });
      
      const responseData = await response.json();
      
      if (response.ok) {
        console.log('Resposta do servidor:', responseData.message);
      } else {
        console.error('Erro do servidor:', responseData.message);
      }
    } catch (error) {
      console.error('Falha ao conectar com o servidor:', error);
      Alert.alert("Erro de Conexão", "Não foi possível registrar o login. Verifique o servidor.");
    }

    onLogin();
  };

  return (
    <View style={styles.container}>
        <View style={styles.formContainer}>
            <Text style={styles.title}>Bem-vindo</Text>

            <TextInput
                style={styles.input}
                placeholder="Digite seu e-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Digite sua senha"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            {/* 2. NOVO BOTÃO DE REGISTRO */}
            <TouchableOpacity 
                style={styles.registerLink} 
                onPress={onNavigateToRegister} // Chamamos a função recebida via props
            >
                <Text style={styles.registerText}>Não tem conta? Cadastre-se</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  formContainer: {
    width: 320,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 45,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    width: '100%',
    height: 45,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
    // NOVO ESTILO: Link para o registro
    registerLink: {
        marginTop: 15,
        alignItems: 'center',
    },
    registerText: {
        color: '#007bff', // Cor de link (azul, comum em cadastros)
        fontSize: 14,
        fontWeight: '600',
        textDecorationLine: 'underline',
    }
});