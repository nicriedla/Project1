const db = require('../config/db');

// Listar todas as matérias
const listarMaterias = async () => {
  try {
    const result = await db.query('SELECT * FROM materias');
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao obter matérias: ' + error.message);
  }
};

// Listar matérias por usuário
const listarMateriasPorUsuario = async (usuario_id) => {
  try {
    const result = await db.query('SELECT * FROM materias WHERE usuario_id = $1', [usuario_id]);
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao obter matérias do usuário: ' + error.message);
  }
};

// Criar uma nova matéria
const criarMateria = async (nome, usuario_id) => {
  try {
    const result = await db.query(
      'INSERT INTO materias (nome, usuario_id) VALUES ($1, $2) RETURNING *',
      [nome, usuario_id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao criar matéria: ' + error.message);
  }
};

// Editar uma matéria por ID
const editarMateria = async (nome, id) => {
  try {
    const result = await db.query(
      'UPDATE materias SET nome = $1 WHERE id = $2 RETURNING *',
      [nome, id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao atualizar matéria: ' + error.message);
  }
};

// Excluir uma matéria por ID
const excluirMateria = async (id) => {
  try {
    const result = await db.query(
      'DELETE FROM materias WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao deletar matéria: ' + error.message);
  }
};

module.exports = {
  listarMaterias,
  listarMateriasPorUsuario,
  criarMateria,
  editarMateria,
  excluirMateria
};