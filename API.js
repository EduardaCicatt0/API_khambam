const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [
  { id: 1, title: 'Tarefa 1', status: 'To Do' },
  { id: 2, title: 'Tarefa 2', status: 'In Progress' },
  { id: 3, title: 'Tarefa 3', status: 'Done' }
];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title, status } = req.body;
  let newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
  let newTask = { id: newId, title, status };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  let id = req.params.id;
  let { title, status } = req.body;
  let task = tasks.find(task => task.id == id);

  if (task) {
    task.title = title ? title : task.title;
    task.status = status ? status : task.status;
    res.json(task);
  } else {
    res.status(404).json({ message: 'Tarefa não encontrada' });
  }
});

app.delete('/tasks/:id', (req, res) => {
  let id = req.params.id;
  let taskIndex = tasks.findIndex(task => task.id == id);

  if (taskIndex > -1) {
    let deletedTask = tasks.splice(taskIndex, 1);
    res.json(deletedTask[0]);
  } else {
    res.status(404).json({ message: 'Tarefa não encontrada' });
  }
});

app.listen(PORT, () => {
  console.log("Servidor rodando em http://localhost:${3000}");
});