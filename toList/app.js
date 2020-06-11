const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener("click",addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);


function addTodo(event){
    event.preventDefault();

    //todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // add todoto local storage
    saveLocalTodos(todoInput.value);

    //complete btn
    const completedBtn= document.createElement('button');
    completedBtn.innerHTML='<i class="fas fa-check"></i>';
    completedBtn.classList.add("complete-btn");
    todoDiv.appendChild(completedBtn)

      // delet btn
      const trashBtn= document.createElement('button');
      trashBtn.innerHTML='<i class="fas fa-trash"></i>';
      trashBtn.classList.add("trash-btn");
      todoDiv.appendChild(trashBtn);
    //   append to list
    todoList.appendChild(todoDiv);


    // clers todo input value/
    todoInput.value= "";
}


function deleteCheck(e){
    const item=e.target;
    if(item.classList[0] === "trash-btn"){
        const todo= item.parentElement;
        todo.classList.add('fall');
        // remove localstorage
        removeLocalTodos(todo);

        todo.addEventListener('transitionend', function(){
        todo.remove();

        });
    }
    if(item.classList[0] === 'complete-btn'){
        const todo= item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    // console.log(todos);
    
    todos.forEach(function(todo){
        // console.log(e.target.value);
       switch (e.target.value){
                case "all":
                    todo.style.display="flex";
                    break;
                case "completed":
                    if(todo.classList.contains("completed")){
                        todo.style.display="flex";
                    }
                    else{
                        todo.style.display="none";            
                        }
                    break;
                    case "uncompleted":
                        if(!todo.classList.contains("completed")){
                            todo.style.display="flex";
                         }
                         else{
                            todo.style.display="none";
                         }
                         break;

              } 
    });
}

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];

    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}
function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];

    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
          //todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);



    //complete btn
    const completedBtn= document.createElement('button');
    completedBtn.innerHTML='<i class="fas fa-check"></i>';
    completedBtn.classList.add("complete-btn");
    todoDiv.appendChild(completedBtn)

      // delet btn
      const trashBtn= document.createElement('button');
      trashBtn.innerHTML='<i class="fas fa-trash"></i>';
      trashBtn.classList.add("trash-btn");
      todoDiv.appendChild(trashBtn);
    //   append to list
    todoList.appendChild(todoDiv);

    });


}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];

    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex= todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}