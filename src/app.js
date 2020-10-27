const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body;

  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repo);

  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const { body } = request;
  const { id } = request.params;
  const foundRepoIndex = repositories.findIndex(repo => repo.id === id);

  if(foundRepoIndex < 0){
    return response.status(400).send();
  }

  repositories[foundRepoIndex] = {
    ...repositories[foundRepoIndex],
    url : body.url,
    title : body.title,
    techs: body.techs
  }

  return response.status(200).send(repositories[foundRepoIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const foundRepoIndex = repositories.findIndex(repo => repo.id === id);
  
  if(foundRepoIndex < 0){
    return response.status(400).send();
  }

  repositories.splice(foundRepoIndex,1);
  
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const foundRepoIndex = repositories.findIndex(repo => repo.id === id);

  if(foundRepoIndex < 0){
    return response.status(400).send();
  }

  repositories[foundRepoIndex] = {
    ...repositories[foundRepoIndex],
    likes : repositories[foundRepoIndex].likes + 1
  }

  return response.json({likes: repositories[foundRepoIndex].likes});
});

module.exports = app;
