import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

// Definimos o "contrato" de props com TypeScript.
// Este componente espera receber uma propriedade 'onLogin',
// que deve ser uma função que não retorna nada (void).
type LoginScreenProps = {
  onLogin: () => void;
};

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  // 1. Adicionamos o estado para "lembrar" o que o usuário digita
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 2. A função de login agora é 'async' para lidar com a chamada de rede
  const handleLoginPress = async () => {
    // Validação básica para não enviar dados vazios
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha o e-mail e a senha.");
      return;
    }
  
    // --- LÓGICA DE REGISTRO NO SERVIDOR ---
    try {
      // O fetch envia uma requisição para o nosso servidor backend
      const response = await fetch('http://:4000/registrar-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }), // Enviamos o e-mail no corpo da requisição
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

    // 3. Após tentar o registro, a lógica de mudar de tela continua
    onLogin();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email} // Conectado ao estado
        onChangeText={setEmail} // Atualiza o estado
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry={true}
        value={password} // Conectado ao estado
        onChangeText={setPassword} // Atualiza o estado
      />

      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

// O stylesheet continua o mesmo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});