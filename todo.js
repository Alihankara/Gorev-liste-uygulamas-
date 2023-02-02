const addinput = document.querySelector("#todoName");
const form = document.querySelector("#todoAddForm");
const todolist = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");



let todos = [];

runEvents();

function runEvents(){
    form.addEventListener("submit",addtodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    clearButton.addEventListener("submit",allClear);
    secondCardBody.addEventListener("click",removetodo);
    filterInput.addEventListener("keyup",filter);

}

function filter(e){
    const filterValue = e.target.value.toLowerCase().trim();
    const todoList = document.querySelectorAll(".list-group-item");
    if(todoList.length>0){
        todoList.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filterValue)){    // includes == iceriyorsa 
                todo.setAttribute("style","display : block");
            }else{
                todo.setAttribute("style","display : none !important");
            }
        });
    }else{
        showAlert("danger","Kayıtlı görev bulunamadı");
    }
    

}

function removetodo(e){
    
    if(e.target.className==="fa fa-remove"){
        // arayüzden silme
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        // storage den silme
        removeTodoToStorage(todo.textContent);
        showAlert("success","Silme işlemi başarılı");
        
        
    }

    if(e.target.className==="btn btn-primary btn-sm mt-3"){
        // check();
        if(todos==null || todos==""){
            window.alert("Silinecek Görev Bulunamadı");
        }else{
            const infoOver = window.confirm("Tüm Görevleri Silmek İstediğine emin misin?")
            if(infoOver===true){
                const allRemoveLi = document.querySelectorAll(".list-group-item");
            allRemoveLi.forEach(function(allremove){
                allremove.remove();
            });
            // localStorage.clear();
            todos=[];
            localStorage.setItem("todos",JSON.stringify(todos));
            showAlert("success","Tüm Görevler Silindi");
            }else{
                showAlert("warning","Silme işlemi iptal edildi");
            }
            

        }
        
         
        
        
        
    }
}

function removeTodoToStorage(removeTodo){
    check();
    todos.forEach(function(todo,index){
        if(removeTodo===todo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function allClear(){
    todos.clearButton();
}

function pageLoaded(){
    check();
    todos.forEach(function(todo){
        addtodointerface(todo);
    });
}

function addtodo(e){
    const inputText = addinput.value.trim();
    if(inputText==null || inputText==""){
        showAlert("danger","Lütfen boş bırakmayınız !!!")
    }else{ 
        addtodointerface(inputText);
        addTodoToStorage(inputText);
        showAlert("success","todo başarıyla eklendi");
    }
    e.preventDefault();
}

function addtodointerface(newTodo){
    const li = document.createElement("li");
    li.className="list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href="#";
    a.className = "delete-item";
    
    const i = document.createElement("i");
    i.className = "fa fa-remove";
    i.id = "faaas";

    

    a.appendChild(i);
    li.appendChild(a);
    todolist.appendChild(li);

    addinput.value="";


}
function addTodoToStorage(newTodo){
    check();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}
    
function check(){
    if(localStorage.getItem("todos")===null){
        todos =[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type,message){

/* <div class="alert alert-success" role="alert">
  This is a success alert—check it out!
</div> */

    const div = document.createElement("div");
    div.className = "alert alert-"+type;   
    // div.className=`alert alert-${type}`;    /ekleme işlemi şeklinde de kullanılabilir
    div.textContent=message;

    firstCardBody.appendChild(div);

    setTimeout(function(){
        div.remove();
    },2500)
}