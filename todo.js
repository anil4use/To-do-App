let todos = [];
let input = document.getElementById("inputTag");
let errorMessege = document.getElementById("errorMessege");

let todoObj = { text: "", isCompleted: false };

const addTodo = (event) => {
  event.preventDefault();
  let indexInp = input.value;
  if (indexInp.length >= 3) {
    todoObj.text = indexInp;
    todos.push({ ...todoObj, id: Date.now() , isCompleted: false });
    input.value = "";
    errorMessege.innerText = "";
    localStorage.setItem('todos', JSON.stringify(todos));
  } else {
    errorMessege.innerText = "Todo is too short...";
    input.value = "";
  }
  console.log(todos);
  displayTodoList();
};

function displayTodoList() {
  let todoContainer = document.querySelector(".todoContainer");
  let inicialHtml = "";
  todos.map((todo) => {
    inicialHtml += `
    <li class="link-body">
    <div class="inp_text">
    <div class="goal" onclick="handleChecked(${todo.id})" data-id="${todo.id}">
    <img class="img" src="https://w7.pngwing.com/pngs/739/672/png-transparent-check-mark-x-mark-check-marks-green-check-logo-angle-text-triangle-thumbnail.png" alt="">
   </div>
        <h1>${todo.text}</h1>
    </div>
    <div class="buttons">
        <button onclick="editTodo(${todo.id})"><i class="fa-solid fa-pen"></i></button>
        <button onclick="deleteTodo(${todo.id})"><i class="fa-solid fa-trash"></i></button>
    </div>
</li>
    `;
  });
  todoContainer.innerHTML = inicialHtml;
}

function deleteTodo(id) {
  todos = todos.filter((tood) => tood.id !== id);
  localStorage.setItem("todos", JSON.stringify(todos));
  displayTodoList();
  //    console.log(todos)
}

function editTodo(id) {
  todos.forEach((todo) => {
    if (todo.id == id) {
      input.value = todo.text;
      deleteTodo(id);
    }
  });
}

function handleChecked(id) {
  todos.forEach((todo) => {
    if (todo.id == id) {
   todo.isCompleted = !todo.isCompleted;

     let imgElement = document.querySelector(`[data-id="${id}"] img`);

      if (todo.isCompleted) {
        imgElement.style.display = "block";
      } else {
        imgElement.style.display = "none";
      }
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}




window.onload = function() {
 let savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
    displayTodoList();
  }
};


