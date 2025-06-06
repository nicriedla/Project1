const db = require('../config/db');

// Função para obter todos os usuários
const listarTarefas = async () => {
  try {
    const result = await db.query('SELECT * FROM tarefas');
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao obter usuários: ' + error.message);
  }
};

// Função para criar um novo usuário
const criarTarefa = async (titulo, descricao, status = 'pendente', data_limite, usuario_id, materia_id) => {
  try {
    const result = await db.query(
      `INSERT INTO tarefas (titulo, descricao, status, data_limite, usuario_id, materia_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [titulo, descricao, status, data_limite, usuario_id, materia_id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao criar usuário: ' + error.message);
  }
};

// Função para atualizar um usuário por ID
const editarTarefa = async (titulo, descricao, status, data_limite, materia_id, id) => {
  try {
    const result = await db.query(
      'UPDATE tarefas SET titulo = $1, descricao = $2, status = $3, data_limite = $4, materia_id = $5 WHERE id = $6 RETURNING *',
      [titulo, descricao, status, data_limite, materia_id, id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao atualizar usuário: ' + error.message);
  }
};

// Função para deletar um usuário por ID
const excluirTarefa = async (id) => {
  try {
    const result = await db.query('DELETE FROM tarefas WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao deletar usuário: ' + error.message);
  }
};

module.exports = {
  listarTarefas,
  criarTarefa,
  editarTarefa,
  excluirTarefa
};
