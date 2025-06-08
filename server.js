// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/index');
const path = require('path');
const session = require('express-session');
const tarefaModels = require('./models/tarefaModels');
const materiaModels = require('./models/materiaModels'); // Se quiser mostrar nomes das matérias
const methodOverride = require('method-override');

const app = express();
const port = 3000;

// Configuração da view engine e das views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  const success = req.query.success ? 'Cadastro realizado com sucesso! Faça login.' : undefined;
  res.render('pages/Login', { success });
});

app.use(session({
  secret: 'seuSegredoAqui',
  resave: false,
  saveUninitialized: false
}));

app.get('/Login', (req, res) => {
  const success = req.query.success ? 'Cadastro realizado com sucesso! Faça login.' : undefined;
  res.render('pages/Login', { success });
});

app.get('/cadastro', (req, res) => {
  res.render('pages/cadastro');
});

app.get('/Gerenciamento', async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/Login');
  }
  try {
    // Busca tarefas do usuário logado
    const tarefas = await tarefaModels.listarTarefasPorUsuario(req.session.userId);
    res.render('pages/Gerenciamento', { tarefas });
  } catch (error) {
    res.render('pages/Gerenciamento', { tarefas: [], error: 'Erro ao carregar tarefas.' });
  }
});

app.use('/', routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

