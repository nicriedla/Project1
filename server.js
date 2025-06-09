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
app.use('/views/css', express.static(path.join(__dirname, 'views/css')));
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
  const msg = req.query.msg;
  try {
    const tarefas = await tarefaModels.listarTarefasPorUsuario(req.session.userId);
    res.render('pages/Gerenciamento', { tarefas, msg });
  } catch (error) {
    res.render('pages/Gerenciamento', { tarefas: [], error: 'Erro ao carregar tarefas.', msg });
  }
});

app.get('/Gerenciamento2', async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/Login');
  }
  // Buscar matérias do usuário logado
  let materias = [];
  if (materiaModels.listarMateriasPorUsuario) {
    materias = await materiaModels.listarMateriasPorUsuario(req.session.userId);
  }
  res.render('pages/Gerenciamento2', { usuario_id: req.session.userId, materias });
});

app.get('/NovaMateria', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/Login');
  }
  res.render('pages/NovaMateria', { usuario_id: req.session.userId });
});

app.use('/', routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

