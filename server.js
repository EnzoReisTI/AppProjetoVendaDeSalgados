// server.js

const express = require('express');
const cors = require('cors'); // Permite que o app e o servidor se comuniquem

const app = express();
const PORT = 4000; // O servidor vai rodar na porta 4000

app.use(cors());
app.use(express.json()); // Permite ao servidor entender o formato JSON

// Este é o nosso "endpoint": o endereço que vai receber os dados de login
app.post('/registrar-login', (req, res) => {
  // 'req.body' contém os dados que o seu aplicativo enviou
  const { email } = req.body;
  const dataHora = new Date().toLocaleString('pt-BR');

  if (!email) {
    // Se por algum motivo o email não foi enviado, retorna um erro.
    return res.status(400).json({ message: 'Email é obrigatório.' });
  }

  // --- AQUI ACONTECE O REGISTRO ---
  // Por enquanto, vamos apenas exibir no console DO SERVIDOR.
  // Em um projeto real, aqui você salvaria em um banco de dados.
  console.log(`[REGISTRO DE LOGIN]: Usuário '${email}' logou em ${dataHora}`);

  // Envia uma resposta de sucesso de volta para o aplicativo
  res.status(200).json({ message: 'Login registrado com sucesso!' });
});

app.listen(PORT, () => {
  console.log(`Servidor de registro rodando na porta ${PORT}`);
});