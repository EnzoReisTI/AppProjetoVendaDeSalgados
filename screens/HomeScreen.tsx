import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ProdutoCard from '../components/ProdutoCard';



const produtos = [
  { id: '1', nome: 'Hambúrger c/ catupiry', preco: 6.0, imagem: require('../assets/H1.png')},
  { id: '2', nome: 'Hamburger c/cheedar', preco: 6.0, imagem: require('../assets/H2.png')},
  { id: '3', nome: 'Mini assado hamburger C/ cheddar', preco: 6.0, imagem: require('../assets/MA1.png')},
  { id: '4', nome: 'Mini-assado-joelho-de-queijo-com-presunto', preco: 6.0, imagem: require('../assets/MA2.png')},
  { id: '5', nome: 'Mini-assado-salsicha-com-cheddar', preco: 6.0, imagem: require('../assets/MA3.png')},
  { id: '6', nome: 'Salsicha-com-cheddar', preco: 6.0, imagem: require('../assets/S1.png')},
  
];



export default function HomeScreen() {
  const [quantidades, setQuantidades] = useState<{ [key: string]: number }>({});

  const setQuantidade = (id: string, valor: number) => {
    setQuantidades(prev => ({ ...prev, [id]: valor }));
  };

  const renderItem = ({ item }: { item: typeof produtos[0] }) => (
    <View style={styles.itemWrapper}>
      <ProdutoCard
        produto={item}
        quantidade={quantidades[item.id] || 0}
        setQuantidade={setQuantidade}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={produtos}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row} // espaçamento entre colunas
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingTop: 10,
  },
  lista: {
    paddingBottom: 20,
    paddingHorizontal: 8,
  },
  row: {
    justifyContent: 'space-between',
  },
  itemWrapper: {
    flex: 1,
    // garante que cada card ocupe metade da largura disponível, menos margin/padding
    paddingHorizontal: 4,
  },
});
