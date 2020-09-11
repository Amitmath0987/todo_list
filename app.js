// select document from the DOM
//Selectors
const todoinput = document.querySelector('.input');
const button = document.querySelector('.todo-button');
const container = document.querySelector('.todo-container');
const todolist = document.querySelector('.todo-list');
const trashbtn = document.querySelector('.trash_btn');
const filter = document.querySelector('.filter_todo');
const deleteall_div = document.querySelector('.deleteall_div');
const date = document.querySelector('span');


//  Add EventListener
document.addEventListener('DOMContentLoaded',displayTodo);
button.addEventListener('click',() =>{
    addTodo();
    myFunc();
});
todolist.addEventListener('click',deletecheck);
filter.addEventListener('click',filterTodo);
deleteall_div.addEventListener('click',() =>{localStorage.removeItem('todos');
AutoRefresh(0.1);
}
);
function AutoRefresh( t ) {
    setTimeout("location.reload(true);", t);
 }
let now = new Date();
let today = now.getDate();
let year = new Date().getFullYear();
let months = ['January','February','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec'];
let month = months[now.getMonth()];
date.innerHTML = `${today}-${month}-${year}`;

//Functions
//add todo
function addTodo(){
this.event.preventDefault();
//create DIV
const todoDiv = document.createElement('div');
//ADD class for the new DIV
todoDiv.classList.add('todo');
//create new list li
const newTodo = document.createElement('li');
newTodo.innerText = todoinput.value;
//Add class to the list li element
newTodo.classList.add('todo-item');
todoDiv.appendChild(newTodo);
//save todo to the localstorage
saveLocal(todoinput.value);


//check mark button
const completedButton = document.createElement('button');
completedButton.innerHTML = '<i class="fas fa-check"></i>';
completedButton.classList.add('complete_btn');
todoDiv.appendChild(completedButton);

//trash button
const trashButton = document.createElement('button');
trashButton.innerHTML = '<i class="fas fa-trash"></i>';
trashButton.classList.add('trash_btn');
todoDiv.appendChild(trashButton);

//Append to List
todolist.appendChild(todoDiv)
//clear todoinput
todoinput.value = '';

}
function myFunc(){
    myFunc = function(){}; // kill it as soon as it was called
    const deleteAlltodo_btn = document.createElement('button');
    deleteAlltodo_btn.innerHTML = 'DeleteAll todos';
    deleteAlltodo_btn.classList.add('deleteall_btn');
    deleteall_div.appendChild(deleteAlltodo_btn);
}
function deletecheck(e){
    const item = e.target;
    // Delete todo
    if(item.classList[0] === 'trash_btn'){
       const todo = item.parentElement;
       //Animate
       todo.classList.add('fall');
       deleteTodo(todo);
       todo.addEventListener('transitionend',function(){
           todo.remove();
       })
   
    }

    //check todo
    if(item.classList[0] === 'complete_btn'){
        const todo = item.parentElement;
        todo.classList.toggle('complete');
    }  
}

//filter Todo
function filterTodo(e){
    const todo = todolist.childNodes;
    todo.forEach((todo) => {
        switch(e.target.value){
            case 'all':
                 todo.style.display = 'flex';
                 break;
                 case 'complete':
                     if(todo.classList.contains('complete')){
                         todo.style.display = 'flex';
                        }else{
                            todo.style.display = 'none';
                        }
                        break;
                        case 'uncomplete':
                            if(!todo.classList.contains('complete'))
                            {
                                todo.style.display = 'flex';
                            }else{
                                todo.style.display = 'none';
                            }
                            break;
                        }
                    })
}


function saveLocal(todo){
    let todos;
    //check is i have a todos.
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));  //  JSON.parse converts the JSON STRINGS INTO THE OBJECTS. 
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));   //   JSON.stringify converts the objects into the JSON strings.
}

function displayTodo(){
    let todos;
    //check is i have a todos.
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }


    todos.forEach((todo) => {
        const todoDiv = document.createElement('div');
//ADD class for the new DIV
todoDiv.classList.add('todo');
//create new list li
const newTodo = document.createElement('li');
newTodo.innerText = todo;
//Add class to the list li element
newTodo.classList.add('todo-item');
todoDiv.appendChild(newTodo);



//check mark button
const completedButton = document.createElement('button');
completedButton.innerHTML = '<i class="fas fa-check"></i>';
completedButton.classList.add('complete_btn');
todoDiv.appendChild(completedButton);

//trash button
const trashButton = document.createElement('button');
trashButton.innerHTML = '<i class="fas fa-trash"></i>';
trashButton.classList.add('trash_btn');
todoDiv.appendChild(trashButton);

//Append to List
todolist.appendChild(todoDiv)
//clear todoinput
todoinput.value = '';

    } )
    
}

function deleteTodo(todo){
    let todos;
    //check is i have a todos.
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    const todoIndex = todo.children[0].innerHTML;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos',JSON.stringify(todos));

}

