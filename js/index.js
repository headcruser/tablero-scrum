const API_URL = 'https://my-json-server.typicode.com/headcruser/tablero-scrum/task';

const dom = {
    columns: {
        todo: document.getElementById('to-do'),
        inprogress:  document.getElementById('in-progress'),
        done: document.getElementById('done'),
    },
    tasks:{
        btn_add: document.getElementById('btn-add-task'),
        btn_cancel: document.getElementById('btn-cancel-task'),
        form_container: document.getElementById('form-container-task'),
        form: document.getElementById('form-task')
    }
}


axios.get(API_URL)
    .then(function(response){
        renderTasks(response.data)
    })
    .catch(function(error){
        console.log(error);
    });


const createTask = function(task){
    let newTask = document.createElement('article');
    newTask.classList.add('task');
    
    let taskTitle = document.createElement('h3');
    taskTitle.innerText = task.title;

    let taskResponsable = document.createElement('p');
    taskResponsable.innerHTML = `<span>Responsable:</span> ${task.person}`;

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
}

function renderTasks(tasks){
    if(!Array.isArray(tasks)){
        return;
    }

    tasks.map(function(task){
        createTask(task)
    })
}


dom.tasks.btn_add.addEventListener('click',function(){
    dom.tasks.form_container.classList.add('active');
});

dom.tasks.btn_cancel.addEventListener('click',function(){
    dom.tasks.form_container.classList.remove('active');
});

dom.tasks.form.addEventListener('submit',function(e){
    e.preventDefault();

    let formData = new FormData(e.target);

    let task = {};
    
    for(let [name, value] of formData) {
        if(name === 'plazo'){
            let deadline =  moment();
            switch (value) {
                case '_dia':
                    deadline.add(1, 'days')
                break;

                case '_semana':
                    deadline.add(7, 'days')
                break;

                case '_mes':
                    deadline.add(30, 'days')
                break;                
            }

            task['deadline'] = deadline.format('x');
            task["created"] =  moment().format('x');
        }else{
            task[name] = value;
        }
    }

    createTask(task);
    e.target.reset();
    dom.tasks.form_container.classList.remove('active');
});


