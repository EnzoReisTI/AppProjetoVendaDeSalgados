import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Alert, ScrollView, ImageBackground } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 
import { supabase } from '../BancoDeDados';

type Props = {
    user: any;
    onBack: () => void;
    onLogout: () => void;
};

export default function ProfileScreen({ user, onBack, onLogout }: Props) {
    const [showDetails, setShowDetails] = useState(false);
    const insets = useSafeAreaInsets();

    // Certifique-se que a imagem está na pasta assets
    const BACKGROUND_IMAGE = require('../assets/IMGF3.png');

    const userName = user?.nome || 'Usuário';
    const userEmail = user?.email || 'Não cadastrado';
    const userTelefone = user?.telefone || '-';
    const rawDate = user?.last_login;
    const userLastLogin = rawDate ? new Date(rawDate).toLocaleString('pt-BR') : 'Primeiro acesso';
    
    const rua = user?.rua || 'Rua não informada';
    const numero = user?.numero || 'S/N';
    const bairro = user?.bairro || 'Bairro não informado';
    const cep = user?.cep || 'CEP não informado';

    const handleToggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const handleLogoutPress = () => {
        Alert.alert(
            "Sair da Conta",
            "Tem certeza que deseja desconectar?",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Sair", 
                    style: "destructive", 
                    onPress: async () => {
                        try {
                            await supabase.auth.signOut();
                            onLogout();
                        } catch (error) {
                            Alert.alert("Erro", "Não foi possível sair.");
                        }
                    } 
                }
            ]
        );
    };

    return (
      
        <ImageBackground source={BACKGROUND_IMAGE} style={styles.backgroundImage} resizeMode="cover">
         
            <View style={[styles.overlay, { paddingTop: insets.top }]}>
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
                
                <View style={styles.header}>
                    <TouchableOpacity onPress={onBack} style={styles.backButton}>
                        <Text style={styles.backArrow}>←</Text>
                        <Text style={styles.backText}>Voltar</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Meu Perfil</Text>
                    <View style={{ width: 60 }} /> 
                </View>

                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>{userName.charAt(0).toUpperCase()}</Text>
                    </View>
                    
                    <Text style={styles.userName}>{userName}</Text>

                    <View style={styles.infoCard}>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>🕒 Último Acesso:</Text>
                            <Text style={styles.valueHighlight}>{userLastLogin}</Text>
                        </View>

                        <View style={styles.divider} />

                        <TouchableOpacity style={styles.detailButton} onPress={handleToggleDetails}>
                            <Text style={styles.detailButtonText}>
                                {showDetails ? 'Ocultar Detalhes Sensíveis ▲' : 'Mostrar Detalhes de Contato e Endereço ▼'}
                            </Text>
                        </TouchableOpacity>

                        {showDetails && (
                            <View style={styles.detailsBlock}>
                                <View style={styles.dividerThin} />
                                <View style={styles.infoRow}>
                                    <Text style={styles.label}>📧 E-mail:</Text>
                                    <Text style={styles.value}>{userEmail}</Text>
                                </View>
                                <View style={styles.dividerThin} />
                                <View style={styles.infoRow}>
                                    <Text style={styles.label}>📱 Telefone:</Text>
                                    <Text style={styles.value}>{userTelefone}</Text>
                                </View>
                                <View style={styles.dividerThin} />
                                <View style={styles.infoRow}>
                                    <Text style={styles.label}>📍 Endereço:</Text>
                                    <View style={styles.addressBlock}>
                                        <Text style={styles.value}>{rua}, Nº {numero}</Text>
                                        <Text style={styles.valueSub}>{bairro}</Text>
                                        <Text style={styles.valueSub}>CEP: {cep}</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>

                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress}>
                        <Text style={styles.logoutText}>Sair da Conta</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({

    backgroundImage: { flex: 1, width: '100%', height: '100%' },
    
    overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' },

    header: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingHorizontal: 15, 
        paddingVertical: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
        elevation: 2, 
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 2 },
        borderRadius: 10,
        marginHorizontal: 10,
        marginTop: 10,
    },
    backButton: { flexDirection: 'row', alignItems: 'center', padding: 5 },
    backArrow: { fontSize: 24, color: '#ff6600', marginRight: 5 },
    backText: { fontSize: 16, color: '#ff6600', fontWeight: 'bold' },
    title: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    
    content: { flexGrow: 1, alignItems: 'center', padding: 20 },
    
    avatarContainer: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#ff6600', justifyContent: 'center', alignItems: 'center', marginBottom: 15, elevation: 5 },
    avatarText: { fontSize: 40, color: '#fff', fontWeight: 'bold' },
  
    userName: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 30, textShadowColor: 'rgba(0, 0, 0, 0.5)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 5 },
    
    infoCard: { 
        width: '100%', 
        maxWidth: 500,
        backgroundColor: '#fff', // Card branco sólido
        borderRadius: 15, 
        padding: 20, 
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom: 20,
    },
    infoRow: { marginBottom: 10 },
    label: { fontSize: 14, color: '#999', marginBottom: 4, fontWeight: '600' },
    value: { fontSize: 16, color: '#333', fontWeight: '500' },
    valueSub: { fontSize: 15, color: '#555', marginTop: 2, marginLeft: 15 },
    valueHighlight: { fontSize: 16, color: '#4CAF50', fontWeight: 'bold' },
    divider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 12 },
    dividerThin: { height: 1, backgroundColor: '#f5f5f5', marginVertical: 8 }, 
    addressBlock: { paddingLeft: 5, marginTop: 5 },
    detailButton: { backgroundColor: '#f5f7fa', padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 10, marginBottom: 10, borderWidth: 1, borderColor: '#e0e0e0' },
    detailButtonText: { color: '#ff6600', fontWeight: 'bold', fontSize: 15 },
    detailsBlock: { marginTop: 10, paddingTop: 5 },
    
    logoutButton: {
        width: '100%',
        maxWidth: 500,
        backgroundColor: '#ffebee',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ffcdd2',
        marginBottom: 30,
        elevation: 2,
    },
    logoutText: { color: '#d32f2f', fontWeight: 'bold', fontSize: 16 }
});