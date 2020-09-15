const express = require("express"); // importando express
const { uuid } = require("uuidv4"); // gera uma id unica universal
const app = express();

app.use(express.json());

//programa encerrou? variavel reseta! Esse é apenas um exemplo. Na realidade usa-se BD.
//se modificar o código, nodemoon reinicia e projetos também são perdidos!
const projects = [];

function logrequest(request, response, next) {
  const { method, url } = request;

  const logLabel = `${method.toUpperCase()}, ${url}`;

  console.log(logLabel);

  return next(); //proximo middleware;
}

app.use(logrequest); //

app.get("/projects", (request, response) => {
  const { title } = request.query;
  const results = title
    ? projects.filter((project) => project.title.includes(title))
    : projects;
  // se o título foi preenchido pelo usuário, FILTER verifica se há algum título dentro de projetos com o mesmo nome
  // e INCLUDES coloca este título à variável result
  // caso não encontre nada, retorna os projetos todos os projetos

  return response.json(results);
});

app.post("/projects", (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner }; //usando o id único universal

  projects.push(project); //adicionando um novo projeto dentro

  return response.json(project); //LEMBRAR DE SEMPRE COLOCAR O ÚLTIMO PROJETO (RECÉM CRIADO) E NÃO A LISTA COMPLETA!!
});

app.put("/projects/:id", (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  // função findIndex retorna o index do projeto que o id for igual ao que eu quero
  const projectIndex = projects.findIndex((project) => project.id === id);

  // se não encontrar o index, mostra um erro com status 400 (bad request)
  // status 200 é sucesso na operação. Para erros, é preciso mudar para 400 - erro
  if (projectIndex < 0) {
    return response.status(400).json({ error: "Project not fount!" });
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete("/projects/:id", (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "Project not found!" });
  }

  projects.splice(projectIndex, 1);

  // Como deletamos a info, não tem nada a enviar. Por isso colocamos o status 204 (no content).
  return response.status(204).send();
});

app.listen(3333, () => {
  console.log("🚀 Back-end started!");
});
