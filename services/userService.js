// services/usuarioservice.js

const db = require("../config/db");
const Usuario = require("../models/userModel");

// Função para obter todos os usuários
const getAllUsers = async () => {
  try {
    const result = await db.query("SELECT * FROM usuarios");
    return result.rows;
  } catch (error) {
    throw new Error("Erro ao obter usuários: " + error.message);
  }
};

// Função para obter um usuário por ID
const getUserById = async (id) => {
  try {
    const result = await db.query("SELECT * FROM usuarios WHERE id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Erro ao obter usuário: " + error.message);
  }
};

// Função para criar um novo usuário
const createUser = async (nome, email, senha) => {
  try {
    const result = await db.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *",
      [nome, email, senha]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error("Erro ao criar usuário: " + error.message);
  }
};

// Função para atualizar um usuário por ID
const updateUser = async (id, nome, email, senha) => {
  try {
    const result = await db.query(
      "UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *",
      [nome, email, senha, id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error("Erro ao atualizar usuário: " + error.message);
  }
};

// Função para deletar um usuário por ID
const deleteUser = async (id) => {
  try {
    const result = await db.query(
      "DELETE FROM usuarios WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error("Erro ao deletar usuário: " + error.message);
  }
};

// Função para obter um usuário por email
const getUserByEmail = async (email) => {
  return await Usuario.getByEmail(email);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
};
