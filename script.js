const tasks = [
  { title: "Comprar comida para o gato", type: "Urgente" },
  { title: "Consertar Computador", type: "Importante" },
  { title: "Beber água", type: "Normal" },
  { title: "Enviar relatório trimestral", type: "Importante" },
  { title: "Fazer exercícios físicos", type: "Normal" },
  { title: "Agendar consulta médica", type: "Urgente" },
  { title: "Ler pelo menos um capítulo de um livro", type: "Normal" },
  { title: "Limpar a despensa", type: "Importante" },
  { title: "Pagar a conta de energia", type: "Urgente" },
  { title: "Assistir a um documentário interessante", type: "Normal" },
];

function createTaskItem(task, index) {
  const liElement = document.createElement("li");
  liElement.classList.add("task__item");

  const taskInfoContainer = document.createElement("div");
  taskInfoContainer.classList.add("task-info__container");

  const spanElement = document.createElement("span");
  spanElement.classList.add("task-type");

  if (task.type === "Urgente") {
    spanElement.style.backgroundColor = "#e40404";
  } else if (task.type === "Normal") {
    spanElement.style.backgroundColor = "#028302";
  } else if (task.type === "Importante") {
    spanElement.style.backgroundColor = "#f3a703";
  }

  const pElement = document.createElement("p");
  pElement.textContent = task.title;

  taskInfoContainer.appendChild(spanElement);
  taskInfoContainer.appendChild(pElement);

  liElement.appendChild(taskInfoContainer);

  const removeButton = document.createElement("button");
  removeButton.classList.add("task__button--remove-task");
  liElement.appendChild(removeButton);

  removeButton.addEventListener("click", () => {
    const taskIndex = tasks.indexOf(task);

    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      renderElements(tasks);
    } else {
      console.error("Índice da tarefa não encontrado.");
    }
  });

  return liElement;
}

function renderElements(tasks) {
  const ulElement = document.querySelector(".tasks__list");

  if (!ulElement) {
    console.error("Elemento <ul> não encontrado.");
    return;
  }

  ulElement.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskItem = createTaskItem(task, index);
    ulElement.appendChild(taskItem);
  });
}

const addButton = document.querySelector(".form__button--add-task");
addButton.addEventListener("click", function (event) {
  event.preventDefault();

  const titleInput = document.getElementById("input_title").value;
  const typeSelect = document.querySelector(".form__input--priority");
  const type = typeSelect.value;

  addNewTask(titleInput, type);

  document.getElementById("input_title").value = "";
  typeSelect.selectedIndex = 0;
});

function addNewTask(title, type) {
  if (!title || !type) {
    alert("Por favor, preencha o título e o tipo da tarefa.");
    return;
  }

  const newTask = { title: title, type: type };
  tasks.push(newTask);

  renderElements(tasks);
}

renderElements(tasks);
