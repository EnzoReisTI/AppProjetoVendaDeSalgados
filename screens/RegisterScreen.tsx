import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Alert } from 'react-native';


type Props = {
  
  onRegisterSuccess: () => void; 
};

export default function RegistroScreen({ onRegisterSuccess }: Props) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleRegistro = () => {
   
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
    console.log('Dados do Novo Usuário:', { nome, email, senha });
    
    Alert.alert('Sucesso', 'Usuário registrado com sucesso!');
    onRegisterSuccess();

    setNome('');
    setEmail('');
    setSenha('');
    setConfirmarSenha('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Criar Nova Conta</Text>

      {/* Input de Nome */}
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        placeholderTextColor="#999"
        value={nome}
        onChangeText={setNome}
        autoCapitalize="words"
      />

      {/* Input de Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Input de Senha */}
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#999"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry 
      />

      {/* Input de Confirmar Senha */}
      <TextInput
        style={styles.input}
        placeholder="Confirme a Senha"
        placeholderTextColor="#999"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
      />

      {/* Botão de Registro */}
      <TouchableOpacity style={styles.botao} onPress={handleRegistro}>
        <Text style={styles.botaoTexto}>REGISTRAR</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff6600', 
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  botao: {
    backgroundColor: '#28a745', 
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});