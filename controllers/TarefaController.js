const pool = require('../config/db');

// Criar uma nova tarefa
exports.criarTarefa = async (req, res) => {
  const { titulo, descricao, status = 'pendente', data_limite, usuario_id, materia_id } = req.body;

  const query = `
    INSERT INTO tarefas (titulo, descricao, status, data_limite, usuario_id, materia_id)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  const values = [titulo, descricao, status, data_limite, usuario_id, materia_id];

  try {
    const result = await pool.query(query, values);
    const tarefa = result.rows[0];
    res.status(201).json(tarefa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as tarefas
exports.listarTarefas = async (req, res) => {
  const query = 'SELECT * FROM tarefas';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar uma tarefa
exports.editarTarefa = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, status, data_limite, materia_id } = req.body;

  const query = `
    UPDATE tarefas
    SET titulo = $1, descricao = $2, status = $3, data_limite = $4, materia_id = $5
    WHERE id = $6 RETURNING *`;
  const values = [titulo, descricao, status, data_limite, materia_id, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma tarefa
exports.excluirTarefa = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM tarefas WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json({ message: 'Tarefa excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};