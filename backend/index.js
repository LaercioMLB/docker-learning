const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { loadConfig } = require('./config');

const { port, mongoUri, corsOrigins } = loadConfig();

// Inicializando o app Express
const app = express();

// Conexão com o MongoDB (com autenticação)
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Middleware para habilitar CORS e processar JSON
app.use(cors({ origin: corsOrigins }));
app.use(bodyParser.json());

// Definindo o modelo de Tarefa (To-do)
const TodoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const Todo = mongoose.model('Todo', TodoSchema);

// Rota para obter todas as tarefas (GET)
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find(); // Retorna todas as tarefas do banco
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para adicionar uma nova tarefa (POST)
app.post('/todos', async (req, res) => {
  const { text } = req.body; // Obtém o texto da tarefa do corpo da requisição

  // Verifica se o campo "text" está presente
  if (!text) {
    return res.status(400).json({ message: 'O campo "text" é obrigatório' });
  }

  const todo = new Todo({
    text,
    completed: false,
  });

  try {
    const newTodo = await todo.save(); // Salva a tarefa no banco
    res.status(201).json(newTodo); // Retorna a tarefa criada
  } catch (err) {
    res.status(400).json({ message: err.message }); // Retorna erro se houver falha no banco de dados
  }
});

// Rota para marcar uma tarefa como concluída (PATCH)
app.patch('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id); // Encontra a tarefa pelo ID

    if (!todo) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    // Alterna o status de "completed" da tarefa
    todo.completed = !todo.completed;
    await todo.save(); // Salva a tarefa modificada
    res.json(todo); // Retorna a tarefa atualizada
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para excluir uma tarefa (DELETE)
app.delete('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id); // Deleta a tarefa pelo ID

    if (!todo) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    res.json({ message: 'Tarefa excluída com sucesso' }); // Retorna uma mensagem de sucesso
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Iniciando o servidor na porta configurada
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
