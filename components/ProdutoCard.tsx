import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, LayoutAnimation, Platform, UIManager,Pressable} from 'react-native';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Produto = {
  id: string;
  nome: string;
  preco: number;
  imagem?: any;
  descricao?: string; 
};

type Props = {
  produto: Produto;
  quantidade: number;
  setQuantidade: (id: string, valor: number) => void;
};

export default function ProdutoCard({ produto, quantidade, setQuantidade }: Props) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <Pressable 
      style={styles.card} 
      onPress={toggleExpand}
      
      android_ripple={{ color: '#ddd' }}
    >
      <View style={styles.headerContent}>
        <View style={styles.imageContainer}>
            {produto.imagem ? (
            <Image source={produto.imagem} style={styles.imagemProduto} />
            ) : (
                <View style={[styles.imagemProduto, { backgroundColor: '#eee' }]} />
            )}
        </View>

        <View style={styles.infoContainer}>
            <Text style={styles.nome}>{produto.nome}</Text>
            <Text style={styles.preco}>R$ {produto.preco.toFixed(2)}</Text>
            
            
            <Text style={styles.dicaExpandir}>
                {expanded ? '▲ Menos detalhes' : '▼ Mais detalhes'}
            </Text>
        </View>
      </View>

      
      {expanded && (
        <View style={styles.descricaoContainer}>
            <Text style={styles.descricaoTexto}>
                {produto.descricao || "Este produto não possui uma descrição detalhada no momento. Ingredientes frescos e selecionados."}
            </Text>
        </View>
      )}

      
      <View style={styles.footer}>
        <View style={styles.controle}>
            <TouchableOpacity
            style={[styles.botaoControle, { backgroundColor: '#f44336' }]}
            onPress={() => setQuantidade(produto.id, Math.max(quantidade - 1, 0))}
            >
            <Text style={styles.botaoTexto}>-</Text>
            </TouchableOpacity>

            <Text style={styles.quantidade}>{quantidade}</Text>

            <TouchableOpacity
            style={[styles.botaoControle, { backgroundColor: '#4CAF50' }]}
            onPress={() => setQuantidade(produto.id, quantidade + 1)}
            >
            <Text style={styles.botaoTexto}>+</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16, 
    marginHorizontal: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden', 
    ...Platform.select({
        web: {
            transition: 'all 0.3s ease',
            cursor: 'pointer'
        } as any
    })
  },
  headerContent: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  imageContainer: {
    width: 90, 
    height: 90, 
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  imagemProduto: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 16, 
    color: '#333',
    marginBottom: 4,
  },
  preco: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2ecc71', 
  },
  dicaExpandir: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  descricaoContainer: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingHorizontal: 4,
  },
  descricaoTexto: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  footer: {
    marginTop: 12,
    alignItems: 'flex-end', 
  },
  controle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botaoControle: {
    width: 32, 
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  quantidade: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 20,
    textAlign: 'center',
  },
});