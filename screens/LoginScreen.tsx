import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, KeyboardAvoidingView, ScrollView,SafeAreaView } from 'react-native';
import { executeSql } from '../dbService'; 

type LoginScreenProps = {
    onLogin: () => void;
    onNavigateToRegister: () => void;
};

export default function LoginScreen({ onLogin, onNavigateToRegister }: LoginScreenProps) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState(''); 
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false); 

    const handleLoginPress = async () => {
        setLoginError('');
        
        if (!email || !senha) {
            setLoginError("Por favor, preencha o e-mail e a senha.");
            return;
        }
    
        setLoading(true);
        try {
            const sql = `SELECT id FROM usuarios WHERE email = ? AND senha = ?`;
            const result = await executeSql(sql, [email, senha]);

            if (result.rows._array.length > 0) {
                onLogin();
            } else {
                setLoginError("Usuário ou senha inválidos.");
            }
        } catch (error) {
            console.error('Falha ao verificar login no DB:', error);
            setLoginError("Erro ao tentar conectar com o banco de dados.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <ScrollView 
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.formContainer}>
                        <Text style={styles.title}>Bem-vindo</Text>
                        <Text style={styles.subtitle}>Faça login para continuar</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>E-mail</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="exemplo@email.com"
                                placeholderTextColor="#999"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Senha</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="********"
                                placeholderTextColor="#999"
                                secureTextEntry={true}
                                value={senha}
                                onChangeText={setSenha}
                            />
                        </View>

                        {loginError ? (
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>{loginError}</Text>
                            </View>
                        ) : null}

                        <TouchableOpacity 
                            style={[styles.button, loading && styles.buttonDisabled]} 
                            onPress={handleLoginPress}
                            disabled={loading}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.buttonText}>
                                {loading ? "Entrando..." : "Entrar"}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.registerLink} 
                            onPress={onNavigateToRegister}
                            activeOpacity={0.6}
                        >
                            <Text style={styles.registerText}>
                                Não tem conta? <Text style={styles.registerTextBold}>Cadastre-se</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f7fa', 
    },
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    formContainer: {
        // RESPONSIVIDADE:
        width: '100%', 
        maxWidth: 400, 
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 30,
        
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
            },
            android: {
                elevation: 8,
            },
            web: {
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
            },
        }),
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: '#333',
        fontWeight: '600',
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#333',
    },
    errorContainer: {
        backgroundColor: '#ffebee',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ffcdd2',
    },
    errorText: {
        color: '#d32f2f',
        textAlign: 'center',
        fontSize: 14,
    },
    button: {
        width: '100%',
        height: 52,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        
        ...Platform.select({
            web: {
                cursor: 'pointer', 
                transition: '0.2s',
            } as any, 
        }),
    },
    buttonDisabled: {
        backgroundColor: '#a5d6a7',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    registerLink: {
        marginTop: 24,
        alignItems: 'center',
        padding: 10,
        
        ...Platform.select({
            web: {
                cursor: 'pointer',
            } as any,
        }),
    },
    registerText: {
        color: '#666',
        fontSize: 15,
    },
    registerTextBold: {
        color: '#4CAF50', 
        fontWeight: 'bold',
    },
});