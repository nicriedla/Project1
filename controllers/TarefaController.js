const tarefaModels = require('../models/tarefaModels');
const materiaModels = require('../models/materiaModels'); // Certifique-se de que o caminho está correto

const TarefaController = {
  listarTarefas: async (req, res) => {
    try {
      const tarefas = await tarefaModels.listarTarefas();
      res.status(200).json(tarefas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  criarTarefa: async (req, res) => {
    const body = req.body;

    const titulo = body.titulo;
    const descricao = body.descricao;
    const status = body.status || 'pendente';
    const data_limite = body.data_limite;
    const usuario_id = req.session.userId; // PEGA DA SESSÃO!
    const materia_id = body.materia_id;

    if (!titulo || !descricao || !data_limite || !materia_id) {
      return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    try {
      const newTarefa = await tarefaModels.criarTarefa(
        titulo,
        descricao,
        status,
        data_limite,
        usuario_id,
        materia_id
      );
      // Redireciona para o gerenciamento após criar
      res.redirect('/Gerenciamento');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  editarTarefa: async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, status, data_limite, materia_id } = req.body;
    try {
      const tarefa = await tarefaModels.editarTarefa(
        titulo,
        descricao,
        status,
        data_limite,
        materia_id,
        id
      );
      if (!tarefa) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
      }
      // Redireciona para a tela de gerenciamento após editar
      res.redirect('/Gerenciamento');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  excluirTarefa: async (req, res) => {
    const { id } = req.params;
    try {
      const tarefa = await tarefaModels.excluirTarefa(id);
      if (!tarefa) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
      }
      res.status(200).json({ message: 'Tarefa excluída com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  paginaEditarTarefa: async (req, res) => {
    const { id } = req.params;
    try {
      const tarefa = await tarefaModels.buscarTarefaPorId(id);
      if (!tarefa) return res.redirect('/Gerenciamento');
      // Busque as matérias do usuário logado
      const materias = await materiaModels.listarMateriasPorUsuario(req.session.userId);
      res.render('pages/EditarTarefa', { tarefa, materias });
    } catch (error) {
      res.redirect('/Gerenciamento');
    }
  }
};

module.exports = TarefaController;