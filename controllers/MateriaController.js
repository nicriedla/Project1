const materiaModels = require('../models/materiaModels');

const MateriaController = {
  listarMaterias: async (req, res) => {
    try {
      const materias = await materiaModels.listarMaterias();
      res.status(200).json(materias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  criarMateria: async (req, res) => {
    const nome = req.body.nome;
    const usuario_id = req.session.userId; // pega da sessão

    if (!nome) {
      return res.status(400).json({ message: 'Preencha o nome da matéria' });
    }

    try {
      await materiaModels.criarMateria(nome, usuario_id);
      res.redirect('/Gerenciamento2');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  editarMateria: async (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    try {
      const materia = await materiaModels.editarMateria(nome, id);
      if (!materia) {
        return res.status(404).json({ message: 'Matéria não encontrada' });
      }
      res.status(200).json(materia);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  excluirMateria: async (req, res) => {
    const { id } = req.params;

    try {
      const materia = await materiaModels.excluirMateria(id);
      if (!materia) {
        return res.status(404).json({ message: 'Matéria não encontrada' });
      }
      res.status(200).json({ message: 'Matéria excluída com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  listarMateriasPorUsuario: async (usuario_id) => {
    return await materiaModels.listarMateriasPorUsuario(usuario_id);
  }
};

module.exports = MateriaController;