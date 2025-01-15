let Tasks = document.querySelector(".input");
let addTask = document.querySelector(".add");
let content = document.querySelector(".tasks");
let a = [];
function addManyTasks(e) {
  if (Tasks.value !== "") {
    let box = document.createElement("div");
    let taskName = document.createElement("h1");
    let removeTask = document.createElement("button");
    let taskNameText = document.createTextNode(Tasks.value);
    let removeTaskText = document.createTextNode("Delete");
    removeTask.className = "delete";
    
    removeTask.appendChild(removeTaskText);
    taskName.appendChild(taskNameText);
    box.appendChild(taskName);
    box.appendChild(removeTask);
    content.appendChild(box);



  
   
      
    // if(result.title===taskName.innerHTML){
      
      
      // }
      let data = localStorage.getItem("Task");
      let result = JSON.parse(data);

    if(localStorage.getItem("Task")){


  
     document.body.querySelector(".tasks").querySelectorAll("div")[0].querySelector("h1").textContent= result.title;
    
    
    
    console.log( result);
    console.log(data);

  }
 
  a.push({id:"234757",title:Tasks.value});
  for(let i=0 ;i<a.length;i++){
  
    window.localStorage.setItem("Task",JSON.stringify(a));
  }
    Tasks.value = "";
    removeTask.onclick = () => {
      box.remove();
    };
  } else {
    e.preventDefult();
  }
}


addTask.addEventListener("click", addManyTasks);


