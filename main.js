let input = document.querySelector(".input");
let addTaskBtn = document.querySelector(".add");
let tasksContainer = document.querySelector(".tasks");
let removeAll = document.querySelector(".remove");
removeAll.onclick=()=>{
  deleteAll()
}
let arrayOfTasks = [];
if (window.localStorage.getItem("Tasks")) {
  arrayOfTasks = JSON.parse(window.localStorage.getItem("Tasks"));
}
showTasksFromLocalStorge();

tasksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    updateFromLocalStorge(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("task")) {
    checkTaskIsDone(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done")
  }
});
addTaskBtn.onclick = () => {
  if (input.value != "") {
    addTaskToArray(input.value);
    input.value = "";
  }
};

function addTaskToArray(inputText) {
  let date = new Date();
  date.setTime(Date.now());

  const task = {
    id: Date.now(),
    title: inputText,
    completed: false,
    date: `${date.getFullYear()}/${
      date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
    }/${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()} - ${
      date.getHours() - 12 < 10 ? `0${date.getHours() - 12}` : date.getHours() - 12
    }:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}:${
      date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
    }`,
  };
  arrayOfTasks.push(task);

  addElementFromArrayToPage(arrayOfTasks);
  addTasksFromArrayToLocalStorge(arrayOfTasks);
}

function addElementFromArrayToPage(arrayOfTasks) {
  tasksContainer.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    div.setAttribute("data-id", task.id);
    if (task.completed) {
      div.className = " task done";
    }
    let taskName = document.createElement("h1");
    taskName.appendChild(document.createTextNode(task.title));
    let deletebtn = document.createElement("button");
    deletebtn.className = "delete";
    deletebtn.appendChild(document.createTextNode("Delete"));
    let dateTask = document.createElement("p");
    dateTask.className = "date-task";
   
    let dateTaskText = document.createTextNode(task.date);
    dateTask.appendChild(dateTaskText);

    div.appendChild(taskName);
    div.appendChild(dateTask)
    div.appendChild(deletebtn);
    tasksContainer.appendChild(div);
  });
}
function addTasksFromArrayToLocalStorge(arrayOfTasks) {
  window.localStorage.setItem("Tasks", JSON.stringify(arrayOfTasks));
}

function showTasksFromLocalStorge() {
  let data = window.localStorage.getItem("Tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementFromArrayToPage(tasks);
  }
}

function updateFromLocalStorge(taskid) {
  arrayOfTasks = arrayOfTasks.filter((task) => {
    return task.id != taskid;
  });
  addTasksFromArrayToLocalStorge(arrayOfTasks);
}

function checkTaskIsDone(taskid) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id === +taskid) {
      arrayOfTasks[i].completed === false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addTasksFromArrayToLocalStorge(arrayOfTasks);

}

function deleteAll(){
  
  window.localStorage.removeItem("Tasks")
  arrayOfTasks=[]
  tasksContainer.innerHTML=""
}
