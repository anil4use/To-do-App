let todos = [];
let input = document.getElementById("inputTag");
let errorMessege = document.getElementById("errorMessege");

let todoObj = { text: "", isCompleted: false };

const addTodo = (event) => {
  event.preventDefault();
  let indexInp = input.value;
  if (indexInp.length >= 3) {
    todoObj.text = indexInp;
    todos.push({ ...todoObj, id: Date.now(), isCompleted: false });
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
    console.log(todo);
    inicialHtml += `
    <li class="link-body">
    <input type="checkbox" onchange="handleChecked(${todo.id})" ${todo.isCompleted ? 'checked' : ''}>        <div class="inp_text">
   </div>
       
    </div>
    <h1>${todo.text}</h1>
    <div class="buttons">
        <button onclick="editTodo(${todo.id})"><i class="fa-solid fa-pen"></i></button>
        <button onclick="deleteTodo(${todo.id})"><i class="fa-solid fa-trash"></i></button>
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
      console.log(todo.isCompleted = !todo.isCompleted)
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}




window.onload = function () {
  let savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
    displayTodoList();
  }
};


