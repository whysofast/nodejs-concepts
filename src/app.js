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
  const foundRepo = repositories.find(repo => repo.id === id);
  
  if(!foundRepo){
    return response.status(400).send();
  }
  console.log(body);
  foundRepo.id = id
  foundRepo.url = body.url
  foundRepo.title = body.title
  foundRepo.techs = body.techs

  return response.status(200).send(foundRepo);
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
  
  const foundRepo = repositories.find(repo=>repo.id === id);

  if(!foundRepo){
    return response.status(400).send();
  }

  foundRepo.likes += 1;

  return response.json({likes: foundRepo.likes});
  // TODO
});

module.exports = app;
