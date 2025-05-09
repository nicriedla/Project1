const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para processar JSON
app.use(express.json());

// Configuração do template engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Rotas
const routes = require('./routes/frontRoutes');
app.use('/', routes);

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});