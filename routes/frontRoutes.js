const express = require("express");
const router = express.Router();
const path = require("path");
const tarefaModels = require("../models/tarefaModels"); // Adicione também se usar tarefas
const materiaModels = require("../models/materiaModels"); // <-- Adicione esta linha

// Roteamento para páginas dinâmicas
router.get("/", (req, res) => {
  const success = req.query.success
    ? "Cadastro realizado com sucesso! Faça login."
    : undefined;
  res.render("pages/Login", { success });
});

router.get("/Login", (req, res) => {
  const success = req.query.success
    ? "Cadastro realizado com sucesso! Faça login."
    : undefined;
  res.render("pages/Login", { success });
});

router.get("/cadastro", (req, res) => {
  res.render("pages/cadastro");
});

router.get("/Gerenciamento", async (req, res) => {
  if (!req.session || !req.session.userId) {
    return res.redirect('/Login');
  }
  const msg = req.query.msg;
  try {
    const tarefas = await tarefaModels.listarTarefasPorUsuario(
      req.session.userId
    );
    res.render("pages/Gerenciamento", { tarefas, msg });
  } catch (error) {
    res.render("pages/Gerenciamento", {
      tarefas: [],
      error: "Erro ao carregar tarefas.",
      msg,
    });
  }
});

router.get("/Gerenciamento2", async (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/Login");
  }
  // Buscar matérias do usuário logado
  let materias = [];
  if (materiaModels.listarMateriasPorUsuario) {
    materias = await materiaModels.listarMateriasPorUsuario(req.session.userId);
  }
  res.render("pages/Gerenciamento2", {
    usuario_id: req.session.userId,
    materias,
  });
});

router.get("/NovaMateria", (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/Login");
  }
  res.render("pages/NovaMateria", { usuario_id: req.session.userId });
});

// Adicione outras rotas conforme necessário

module.exports = router;
