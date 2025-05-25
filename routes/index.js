// routes/index.js
const express = require('express');
const router = express.Router();
const TarefaController = require('../controllers/TarefaController');
const userController = require('../controllers/userController');
const MateriaController = require('../controllers/MateriaController');

// Rotas para o CRUD de tarefas
router.post('/tarefas', TarefaController.criarTarefa);
router.get('/tarefas', TarefaController.listarTarefas);
router.put('/tarefas/:id', TarefaController.editarTarefa);
router.delete('/tarefas/:id', TarefaController.excluirTarefa);

// Rotas para o CRUD de usuários
router.post('/usuarios', userController.createUser);
router.get('/usuarios', userController.getAllUsers);
router.get('/usuarios/:id', userController.getUserById);
router.put('/usuarios/:id', userController.updateUser);
router.delete('/usuarios/:id', userController.deleteUser);

// Rotas para o CRUD de matérias
router.post('/materias', MateriaController.criarMateria);
router.get('/materias', MateriaController.listarMaterias);
router.put('/materias/:id', MateriaController.editarMateria);
router.delete('/materias/:id', MateriaController.excluirMateria);

module.exports = router;