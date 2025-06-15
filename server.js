// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/index");
const path = require("path");
const session = require("express-session");
const tarefaModels = require("./models/tarefaModels");
const materiaModels = require("./models/materiaModels"); // Se quiser mostrar nomes das matérias
const methodOverride = require("method-override");

const app = express();
const port = 3000;

// Configuração da view engine e das views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/views/css", express.static(path.join(__dirname, "views/css")));
app.use(methodOverride("_method"));

app.use(
  session({
    secret: "umSegredoSeguroAqui", // troque por uma string segura
    resave: false,
    saveUninitialized: false,
  })
);

const frontRoutes = require("./routes/frontRoutes");
app.use("/", frontRoutes);

app.use("/", routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
