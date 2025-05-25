const pool = require('../config/db');

exports.listarMaterias = async (req, res) => {
  const query = 'SELECT * FROM materias';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.criarMateria = async (req, res) => {
  const { usuario_id } = req.body;
  const { nome } = req.body;

  const query = `
    INSERT INTO materias (nome, usuario_id)
    VALUES ($1, $2)
    RETURNING *`;
  const values = [nome, usuario_id];

  try {
    const result = await pool.query(query, values);
    const materia = result.rows[0];
    res.status(201).json(materia);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarMateria = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  const query = `
    UPDATE materias
    SET nome = $1
    WHERE id = $2 RETURNING *`;
  const values = [nome, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Matéria não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.excluirMateria = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM materias WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Matéria não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

