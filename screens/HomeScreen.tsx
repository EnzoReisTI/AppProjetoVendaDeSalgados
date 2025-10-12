import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView, Dimensions } from 'react-native';
import ProdutoCard from '../components/ProdutoCard';

type Produto = {
  id: string;
  nome: string;
  preco: number;
};

const produtos: Produto[] = [
  { id: '1', nome: 'Hambúrguer c/ catupiry e mussarela', preco: 6 },
  { id: '2', nome: 'X-burguer (carne, catupiry, mussarela e presunto)', preco: 6 },
  { id: '3', nome: 'Joelho de frango c/ catupiry e mussarela', preco: 6 },
  { id: '4', nome: 'Hambúrguer c/ cheddar e mussarela', preco: 6 },
  { id: '5', nome: 'Joelho de frango c/ catupiry e mussarela', preco: 6 },
  { id: '6', nome: 'Joelho de queijo c/ presunto e catupiry', preco: 6 },
  { id: '7', nome: 'Esfiha de carne moída', preco: 6 },
  { id: '8', nome: 'Salsicha c/ cheddar e mussarela', preco: 6 },
  { id: '9', nome: 'Cachorro-quente (salsicha, maionese, tomate, cebola e pimentão)', preco: 6 },
];

export default function HomeScreen() {
  const [quantidades, setQuantidades] = useState<Record<string, number>>({});

  const handleQuantidade = (id: string, valor: number) => {
    setQuantidades({ ...quantidades, [id]: valor });
  };

  const enviarPedido = () => {
    let mensagem = '🍴 *Pedido de Salgados*\n\n';
    produtos.forEach(produto => {
      const qtd = quantidades[produto.id] || 0;
      if (qtd > 0) {
        mensagem += `• ${produto.nome}: ${qtd} x R$${produto.preco} = R$${qtd * produto.preco}\n`;
      }
    });

    const total = produtos.reduce(
      (acc, p) => acc + (quantidades[p.id] || 0) * p.preco,
      0
    );

    mensagem += `\n💰 *Total:* R$${total.toFixed(2)}\n`;
    mensagem += '\n📦 Enviado via Dunamis Salgados App';

    const numeroWhatsApp = '5521969714096';
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Dunamis Salgados / Assados</Text>

      <View style={styles.grid}>
        {produtos.slice(0, 9).map(item => (
          <ProdutoCard
            key={item.id}
            produto={item}
            quantidade={quantidades[item.id] || 0}
            setQuantidade={handleQuantidade}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.botao} onPress={enviarPedido}>
        <Text style={styles.botaoTexto}>Enviar Pedido</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  botao: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '80%',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
