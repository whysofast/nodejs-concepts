# nodejs-concepts
Challenge 2 - NodeJS Concepts - GoStack Bootcamp

Learnings : Using SPREAD OPERATOR to update data of an existing object by getting its previous data and just overwriting the specified ones
```json
    repositories[foundRepoIndex] = {
    ...repositories[foundRepoIndex],
    url : body.url,
    title : body.title,
    techs: body.techs
  }
```
