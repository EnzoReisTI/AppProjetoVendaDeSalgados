import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const larguraTela = Dimensions.get('window').width;
const larguraCard = (larguraTela - 80) / 3; // divide a tela em 3 colunas com espaçamento

type Produto = {
  id: string;
  nome: string;
  preco: number;
};

type Props = {
  produto: Produto;
  quantidade: number;
  setQuantidade: (id: string, valor: number) => void;
};

export default function ProdutoCard({ produto, quantidade, setQuantidade }: Props) {
  return (
    <View style={[styles.card, { width: larguraCard, height: larguraCard }]}>
      <Text style={styles.nome} numberOfLines={2}>{produto.nome}</Text>
      <Text style={styles.preco}>R$ {produto.preco}</Text>
      <View style={styles.controle}>
        <TouchableOpacity
          style={styles.botaoControle}
          onPress={() => setQuantidade(produto.id, Math.max(quantidade - 1, 0))}
        >
          <Text style={styles.botaoTexto}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantidade}>{quantidade}</Text>
        <TouchableOpacity
          style={styles.botaoControle}
          onPress={() => setQuantidade(produto.id, quantidade + 1)}
        >
          <Text style={styles.botaoTexto}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  nome: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  preco: { fontSize: 13, color: '#555', marginBottom: 8 },
  controle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  botaoControle: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 3,
    width: 25,
    alignItems: 'center',
  },
  botaoTexto: { fontSize: 16 },
  quantidade: { fontSize: 14, marginHorizontal: 6 },
});
