const express = require("express"); // importando express
const { uuid } = require("uuidv4"); // importou para gerar uma id unica universal
const app = express();

app.use(express.json());

const projects = []; //programa encerrou? variavel reseta! Esse é apenas um exemplo. Na realidade usa-se BD.

app.get("/projects/", (request, response) => {
  /*   const { title, owner } = request.query;
  console.log(title, owner); */

  return response.json(projects);
});

app.post("/projects", (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner }; //usando o id único universal

  projects.push(project); //adicionando um novo projeto dentro

  return response.json(project); //LEMBRAR DE SEMPRE COLOCAR O ÚLTIMO PROJETO E NÃO TODOS!!
});

app.put("/projects/:id", (request, response) => {
  const { id } = request.params;

  // função findIndex retorna o index do projeto que o id for igual ao que eu quero
  const projectIndex = projects.findIndex((project) => project.id === id);

  // se não encontrar o index, mostra um erro com status 400 (bad request)
  if (projectIndex < 0) {
    return response.status(400).json({ error: "Project not fount!" });
  }

  return response.json(["project 4", "project 2", "project 3"]);
});

app.delete("/projects/:id", (request, response) => {
  return response.json(["projects 2", "projects 3"]);
});

app.listen(3333, () => {
  console.log("🚀 Back-end started!");
});
