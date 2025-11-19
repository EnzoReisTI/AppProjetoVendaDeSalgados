import React, { useState } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  Image, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';
import ProdutoCard from '../components/ProdutoCard';

// Dados dos seus produtos com as novas descrições
const PRODUTOS_SALGADOS = [
  { 
    id: '1', 
    nome: 'Hambúrguer c/ Catupiry', 
    preco: 6.0, 
    // imagem: require('../assets/H1.png'), // Descomente se tiver a imagem local
    imagem: require('../assets/H1.png'),
    descricao: 'Um clássico irresistível! Hambúrguer suculento envolto em nossa massa artesanal macia, finalizado com uma camada generosa de Catupiry original cremoso.'
  },
  { 
    id: '2', 
    nome: 'Hambúrguer c/ Cheddar', 
    preco: 6.0, 
    // imagem: require('../assets/H2.png'),
    imagem: require('../assets/H2.png'), 
    descricao: 'Para os amantes de queijo! Carne de hambúrguer saborosa assada na massa douradinha, recheada com o toque marcante e a cremosidade do queijo Cheddar.'
  },
  { 
    id: '3', 
    nome: 'Mini Burger c/ Cheddar', 
    preco: 6.0, 
    // imagem: require('../assets/MA1.png'),
    imagem: require('../assets/MA1.png'),
    descricao: 'A versão compacta do nosso sucesso. Perfeito para um lanche rápido, trazendo o equilíbrio ideal entre massa fofinha, carne e muito cheddar.'
  },
  { 
    id: '4', 
    nome: 'Mini Joelho (Q. e Presunto)', 
    preco: 6.0, 
    // imagem: require('../assets/MA2.png'),
    imagem: require('../assets/MA2.png'),
    descricao: 'O famoso Joelho em versão especial. Massa leve e levemente adocicada, recheada com a dupla infalível: presunto de qualidade e mussarela derretida.'
  },
  { 
    id: '5', 
    nome: 'Mini Salsicha c/ Cheddar', 
    preco: 6.0, 
    // imagem: require('../assets/MA3.png'),
    imagem: require('../assets/MA3.png'), 
    descricao: 'O favorito da garotada! Salsicha de primeira qualidade enrolada em massa assada, acompanhada de queijo cheddar para dar aquele sabor extra.'
  },
  { 
    id: '6', 
    nome: 'Enroladinho Salsicha c/ Cheddar', 
    preco: 6.0, 
    // imagem: require('../assets/S1.png'),
    imagem:  require('../assets/S1.png'),
    descricao: 'Enroladinho de salsicha tamanho grande. Maravilhoso!.'
  },
];

export default function CatalogoScreen() {
  const [quantidades, setQuantidades] = useState<{[key: string]: number}>({});

  const handleSetQuantidade = (id: string, valor: number) => {
    setQuantidades(prev => ({ ...prev, [id]: valor }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fafafa" />
      
      <View style={styles.header}>
        {/* Substitua pela sua logo real quando possível */}
        <Image 
          source={{ uri: 'https://via.placeholder.com/150x50?text=SUA+LOGO' }} 
          style={styles.logo}
        />
      </View>

      <FlatList
        data={PRODUTOS_SALGADOS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProdutoCard 
            produto={item}
            quantidade={quantidades[item.id] || 0}
            setQuantidade={handleSetQuantidade}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    width: '100%',
    height: 90, 
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  logo: {
    width: 160, 
    height: 60, 
    resizeMode: 'contain',
  },
  listContent: {
    paddingHorizontal: 10, 
    paddingBottom: 20,
    paddingTop: 5,
  },
});