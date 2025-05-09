# Web Application Document - Projeto Individual - Módulo 2 - Inteli

## Nome do Projeto
Estuda+

#### Autor do projeto
Nicole Riedla Paiva Neves

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução (Semana 01)

O *Estuda+* é uma aplicação web desenvolvida com o propósito de auxiliar estudantes na organização e no planejamento de suas atividades acadêmicas. Diante de uma rotina intensa e, muitas vezes, desorganizada, a plataforma surge como uma solução eficiente para centralizar informações relacionadas às matérias e tarefas escolares em um único ambiente digital.

Por meio do sistema, os usuários podem cadastrar suas matérias e associar tarefas específicas a cada uma delas, definindo prazos e acompanhando o status de execução (como pendente, em andamento ou concluída). Dessa forma, a aplicação proporciona uma visão clara e objetiva da rotina de estudos, permitindo que o estudante visualize seu progresso e priorize suas demandas com mais assertividade. Espera-se, assim, que o uso do Estuda+ promova o desenvolvimento da disciplina, da gestão do tempo e da autonomia — competências essenciais para o sucesso acadêmico.

A estrutura do sistema foi concebida com base na arquitetura MVC (Model-View-Controller), a qual permite uma organização eficiente do código, separando a lógica de negócio (model), a interface com o usuário (view) e o controle das requisições (controller). O backend da aplicação foi implementado utilizando Node.js e o framework Express, garantindo flexibilidade e bom desempenho. Para a camada de visualização, foi adotado o motor de templates EJS, que possibilita a renderização dinâmica das páginas. Além disso, o banco de dados PostgreSQL foi escolhido por sua robustez, segurança e compatibilidade com o modelo relacional proposto na modelagem.

---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01 - opcional)

*Posicione aqui sua(s) Persona(s) em forma de texto markdown com imagens, ou como imagem de template preenchido. Atualize esta seção ao longo do módulo se necessário.*

### 2.2. User Stories (Semana 01 - opcional)

*Posicione aqui a lista de User Stories levantadas para o projeto. Siga o template de User Stories e utilize a referência USXX para numeração (US01, US02, US03, ...). Indique todas as User Stories mapeadas, mesmo aquelas que não forem implementadas ao longo do projeto. Não se esqueça de explicar o INVEST de 1 User Storie prioritária.*

---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados  (Semana 3)

O banco de dados foi desenvolvido com base no modelo relacional, uma abordagem que organiza os dados em tabelas interligadas, garantindo consistência, integridade e facilidade de acesso às informações. 

A seguir, serão apresentados os modelos relacionais que compõem o banco de dados da aplicação, acompanhados de uma explicação detalhada sobre cada tabela e seus respectivos relacionamentos.

<div style="text-align: center;">
    <sub>Figura 1 - Modelo Relacional do Banco de Dados</sub>
    <img src="./assets/modelo_relacional.png" />
    <sup>Fonte: Autoria própria (2025)</sup>
</div>

---

##### Tabela: `usuarios`

Armazena os dados dos usuários cadastrados.

- `id`: Identificador único do usuário (chave primária).
- `nome`: Nome completo do usuário.
- `email`: Endereço de e-mail único.
- `senha`: Senha criptografada para login.

##### Tabela: `estados_tarefa`

Define os diferentes estados que uma tarefa pode assumir (ex: pendente, em andamento, concluída).

- `id`: Identificador único do estado (chave primária).
- `nome`: Nome do estado (valor único).

##### Tabela: `materias`

Representa as matérias registradas por cada usuário.

- `id`: Identificador único da matéria (chave primária).
- `nome`: Nome da matéria.
- `usuario_id`: Referência ao usuário que criou a matéria (`usuarios.id`).

##### Tabela: `tarefas`

Contém as tarefas cadastradas pelos usuários.

- `id`: Identificador único da tarefa (chave primária).
- `titulo`: Título da tarefa.
- `descricao`: Descrição detalhada.
- `status_id`: Referência ao estado atual da tarefa (`estados_tarefa.id`).
- `data_limite`: Data de entrega da tarefa.
- `usuario_id`: Referência ao usuário responsável (`usuarios.id`).
- `materia_id`: Referência à matéria associada (`materias.id`).

---

#### Relacionamentos

Os relacionamentos entre as tabelas são definidos da seguinte forma:

- **Usuário → Matérias (1:N):** <br>
  Um único usuário pode cadastrar várias matérias. No entanto, cada matéria está sempre vinculada a apenas um usuário. Isso garante que o sistema saiba quem é o dono de cada matéria.

- **Matéria → Tarefas (1:N):** <br>
  Uma matéria pode ter várias tarefas associadas. Assim, o usuário pode organizar suas tarefas com base em cada disciplina cadastrada.

- **Usuário → Tarefas (1:N):** <br>
  Cada usuário pode criar diversas tarefas. Essa ligação permite que o sistema identifique quais tarefas pertencem a qual usuário.

- **Estado de tarefa → Tarefa (1:N):** <br>
  Cada tarefa tem um único estado (por exemplo, "pendente", "em andamento" ou "concluída"), mas um mesmo estado pode ser usado por várias tarefas diferentes.

---

Além disso, a seguir, tem-se o arquivo referente à modelagem física do banco de dados, o qual define a estrutura real das tabelas no sistema gerenciador de banco de dados (SGBD). Esse script em SQL permite a criação das tabelas conforme a modelagem proposta, garantindo a integridade referencial e a correta organização dos dados.

Acessar arquivo: [Código](../scripts/Codigo.sql)

```sql
-- Tabela: usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

-- Tabela: estados_tarefa
CREATE TABLE estados_tarefa (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE
);

-- Tabela: materias
CREATE TABLE materias (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    usuario_id INTEGER NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabela: tarefas
CREATE TABLE tarefas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    status_id INTEGER,
    data_limite DATE,
    usuario_id INTEGER NOT NULL,
    materia_id INTEGER,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (materia_id) REFERENCES materias(id) ON DELETE SET NULL,
    FOREIGN KEY (status_id) REFERENCES estados_tarefa(id) ON DELETE SET NULL
);
```


### 3.1.1 BD e Models (Semana 5)
*Descreva aqui os Models implementados no sistema web*

### 3.2. Arquitetura (Semana 5)

*Posicione aqui o diagrama de arquitetura da sua solução de aplicação web. Atualize sempre que necessário.*

**Instruções para criação do diagrama de arquitetura**  
- **Model**: A camada que lida com a lógica de negócios e interage com o banco de dados.
- **View**: A camada responsável pela interface de usuário.
- **Controller**: A camada que recebe as requisições, processa as ações e atualiza o modelo e a visualização.
  
*Adicione as setas e explicações sobre como os dados fluem entre o Model, Controller e View.*

### 3.3. Wireframes (Semana 03 - opcional)

*Posicione aqui as imagens do wireframe construído para sua solução e, opcionalmente, o link para acesso (mantenha o link sempre público para visualização).*

### 3.4. Guia de estilos (Semana 05 - opcional)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*


### 3.5. Protótipo de alta fidelidade (Semana 05 - opcional)

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

### 3.6. WebAPI e endpoints (Semana 05)

*Utilize um link para outra página de documentação contendo a descrição completa de cada endpoint. Ou descreva aqui cada endpoint criado para seu sistema.*  

### 3.7 Interface e Navegação (Semana 07)

*Descreva e ilustre aqui o desenvolvimento do frontend do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que o leitor possa consultar caso ele se interessar em aprofundar._<br>

---
---