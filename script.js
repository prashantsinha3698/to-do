let todoArray=[];
const todoInput = document.getElementById('todoInput');
const todoList = document.querySelector('.todo-list');
const dateInput =document.getElementById('date-input');
const todoDate =document.getElementById('todo-date');
console.log(todoInput.value);
document.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        addToDO();
    }
});
window.onload = function(){
    if(localStorage.getItem('todoArrayString')){
        todoArray=localStorage.getItem('todoArrayString').split(',')||[];
        includeToDo();
    }
}

function addToDO(){
    if(localStorage.getItem('todoArrayString')){
    todoArray=localStorage.getItem('todoArrayString').split(',')||[];}
    if(todoInput.value){
        console.log(todoInput.value);
        //console.log(todoDate.value);
        todoArray.push(todoInput.value);
        console.log(todoArray);
        includeToDo();
        todoInput.value='';
    }  
}
function includeToDo(){
    let allToDoString='';
    for (let i = 0; i < todoArray.length; i++) {
        allToDoString += 
            `<div class="todo-list-div">
                <li>${todoArray[i]}</li>
                <button title="Remove"class="delete-btn" onclick="deleteToDo(${i})"><i class="fa-regular fa-trash-can"></i></button>
            </div>`;
    }
    localStorage.setItem('todoArrayString',todoArray.toString());
    todoList.innerHTML=allToDoString;
}
function deleteToDo(i){
    let spliceElement=todoArray.splice(i,1);
    console.log(`removed element: ${spliceElement}`);
    console.log(todoArray);
    localStorage.setItem('todoArrayString',todoArray.toString());
    includeToDo();
}
function addDate(){
    if(dateInput.innerHTML){
        dateInput.innerHTML='';
    }
    else{
        dateInput.innerHTML='<input type="date" name="addDate" id="todo-date">';
    }
}