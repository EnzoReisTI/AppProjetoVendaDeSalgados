import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

type Produto = {
  id: string;
  nome: string;
  preco: number;
  imagem?: any;
};

type Props = {
  produto: Produto;
  quantidade: number;
  setQuantidade: (id: string, valor: number) => void;
};

export default function ProdutoCard({ produto, quantidade, setQuantidade }: Props) {
  return (
    <View style={styles.card}>
      {produto.imagem && (
        <Image source={produto.imagem} style={styles.imagemProduto} />
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.nome} numberOfLines={2}>
          {produto.nome}
        </Text>
        <Text style={styles.preco}>R$ {produto.preco.toFixed(2)}</Text>
      </View>

      <View style={styles.controle}>
        <TouchableOpacity
          style={[styles.botaoControle, { backgroundColor: '#f44336' }]}
          onPress={() => setQuantidade(produto.id, Math.max(quantidade - 1, 0))}
        >
          <Text style={styles.botaoTexto}>-</Text>
        </TouchableOpacity>

        <Text style={styles.quantidade}>{quantidade}</Text>

        <TouchableOpacity
          style={[styles.botaoControle, { backgroundColor: '#28a745' }]}
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
    backgroundColor: '#fff',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 8,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden', // garante que cantos da imagem fiquem arredondados
  },
  imagemProduto: {
    width: '100%',
    aspectRatio: 1.6,
    resizeMode: 'cover',
  },
  infoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  nome: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 13,
    color: '#333',
  },
  preco: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ff6600',
    marginTop: 4,
  },
  controle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  botaoControle: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantidade: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
});
