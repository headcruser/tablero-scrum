const API_URL = 'https://my-json-server.typicode.com/headcruser/tablero-scrum/task';

const dom = {
    columns: {
        todo: document.getElementById('in-progress'),
        inprogress:  document.getElementById('in-progress'),
        done: document.getElementById('done')
    }
}


axios.get(API_URL)
    .then(function(response){
        createTasks(response.data)
    })
    .catch(function(error){
        console.log(error);
    });

function createTasks(tasks){
    if(!Array.isArray(tasks)){
        return;
    }

    
    tasks.map(function(task){
        let newTask = document.createElement('article');
        
        let taskTitle = document.createElement('h3');
        taskTitle.innerText = task.title;

        let taskResponsable = document.createElement('p');
        taskResponsable.innerHTML = `<span>Responsable:</span> ${task.Person}`;

        let taskPlazo = document.createElement('p');
        taskPlazo.innerHTML = `<span>Plazo:</span> ${moment.unix(task.deadline).format('DD/MM/YYYY') }`;
        
        newTask.appendChild(taskTitle);
        newTask.appendChild(taskResponsable);
        newTask.appendChild(taskPlazo);

        
        
        
        
        if(task.state === 'to-do'){
            dom.columns.todo.appendChild(newTask);
        }

        if(task.state === 'in-progress'){
            dom.columns.inprogress.appendChild(newTask);
        }

        if(task.state === 'done'){
            dom.columns.done.appendChild(newTask);
        }
    })
}
