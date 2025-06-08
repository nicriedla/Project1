// controllers/userController.js

const userService = require('../services/userService');

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    await userService.createUser(nome, email, senha);

    // Redireciona para a página de login após cadastro, com mensagem de sucesso
    return res.redirect('/Login?success=1');
  } catch (error) {
    // Se erro, renderiza a página de cadastro com a mensagem de erro
    return res.render('pages/cadastro', { error: error.message, success: undefined });
  }
};

const updateUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const updatedUser = await userService.updateUser(req.params.id, nome, email, senha);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    if (deletedUser) {
      res.status(200).json(deletedUser);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await userService.getUserByEmail(email);
    if (user && user.senha === senha) {
      // Salva o ID do usuário na sessão
      req.session.userId = user.id;
      return res.redirect('/Gerenciamento');
    } else {
      return res.render('pages/Login', { success: undefined, error: 'Email ou senha inválidos.' });
    }
  } catch (error) {
    return res.render('pages/Login', { success: undefined, error: 'Erro ao fazer login.' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
};
