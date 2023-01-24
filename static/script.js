

const checkboxes = document.querySelectorAll('.check-completed');
for (let i = 0; i < checkboxes.length; i++) {
    const checkbox = checkboxes[i];
    checkbox.onchange = function (e) {
        console.log('event', e);
        const newCompleted = e.target.checked;
        const todoId = e.target.dataset['id'];
        fetch('/todos/'+todoId+'/set-completed', {
            method: 'POST',
            body: JSON.stringify({
                'completed': newCompleted
            }),
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(function() {
            document.getElementById('error').className = 'hidden';
        })
        .catch(function() {
        document.getElementById('error').className = '';
    })
    }
}
/*get delete button*/
const deleteButtons = document.querySelectorAll('.delete-btn');
//console.log('delete Buttons'+ deleteButtons);
for (let j = 0; j < deleteButtons.length; j++) {
    const deleteBtn = deleteButtons[j];
    deleteBtn.onclick = function (e) {
        console.log('item to be deleted'+ e.target);
        const deleteId = e.target.dataset['id'];
        fetch('/todos/'+ deleteId , {
            method: 'DELETE',
            headers:{
                'Content-Type' : 'application/json'
            }
        }).then(function() {
            document.getElementById('error').className = 'hidden';
            const item = e.target.parentElement;
            item.remove();
        })
        .catch(function () {
            document.getElementById('error').className = '';
        })
    }             
}
/*
    Create Todos
*/
const descInput = document.getElementById('desc');
const active_Lst_Id =  document.getElementById('active-list-id').getAttribute('data-id');
console.log(active_Lst_Id);
document.getElementById('form').onsubmit = function(e) {
    e.preventDefault();
    const desc = descInput.value;
    descInput.value = '';
    fetch('/todos/create', {
    method: 'POST',
    body: JSON.stringify({
        'description': desc,
        'activeLstId': active_Lst_Id
    }),
    headers: {
        'Content-Type': 'application/json',
    }
    })
    .then(response =>  response.json())   
    .then(jsonResponse => {

    console.log(jsonResponse);

    const liItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.className = 'check-completed';
    checkbox.type = 'checkbox';
    checkbox.setAttribute('data-id', jsonResponse["id"]);
    liItem.appendChild(checkbox);

      const text = document.createTextNode(' '+ jsonResponse["description"]);
    liItem.appendChild(text);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.setAttribute('data-id', jsonResponse.id);
    deleteBtn.innerHTML = '&cross;';
    liItem.appendChild(deleteBtn); 

    //liItem.innerHTML = jsonResponse["description"];
    document.getElementById('todos').appendChild(liItem);
    document.getElementById('error').className = 'hidden'; 
}).catch(function() {
    console.log('error occured While create') ;
    document.getElementById('error').className = '';
})
}

/* Create Main List Item*/
const lstInputName = document.getElementById('lst-desc');
document.getElementById('form-create-list').onsubmit = function (e) {
    e.preventDefault();
    const lstName = lstInputName.value;
    lstInputName.value = '';
    fetch('/todolist/create', {
        method: 'POST',
        body: JSON.stringify({
            'description': lstName
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(responseObj => {
        console.log('Main List'+ responseObj);
    
    const liItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.className = 'lst-check-completed';
    checkbox.type = 'checkbox';
    checkbox.setAttribute('data-id', responseObj["id"]);
    liItem.appendChild(checkbox);

    var a = document.createElement('a');
    const text = ' '+ responseObj["description"];
    var linkText = document.createTextNode(text);
    a.href = "/lists/"+ responseObj["id"]
    a.appendChild(linkText);               
    liItem.appendChild(a);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-list-btn';
    deleteBtn.setAttribute('data-id', responseObj.id);
    deleteBtn.innerHTML = '&cross;';
    liItem.appendChild(deleteBtn); 

    //liItem.innerHTML = jsonResponse["description"];
    document.getElementById('lists').appendChild(liItem);
    document.getElementById('error').className = 'hidden';

    }).catch(function() {
        console.log('error while Creating Main List ');
    })
}

/* delete Main List Item*/
// delete children first then parent
const deleteListButtons = document.querySelectorAll('.delete-list-btn');
for (let x  = 0; x   < deleteListButtons.length; x++) {
    const lstMainDeleteBtn = deleteListButtons[x];
    lstMainDeleteBtn.onclick = function(e) {
        console.log( 'Target button '+ e.target );
        const deleteId = e.target.dataset['id'];
        console.log(deleteId);
        fetch('/lists/'+ deleteId , {
            method: 'DELETE',
            headers:{
                'Content-Type' : 'application/json'
            }
        }).then(function () {
            document.getElementById('m-error').className = 'hidden';
            const item = e.target.parentElement;
            item.remove();
            /*Get elements of parent node and delete them*/
            //or refresh
            window.location.reload(true);
        })
        .catch(function () {
            console.log('Error while delete main list Item ');
            document.getElementById('m-error').className = '';
        })
    }              
}

// Set Completed List
const listCheckBoxes = document.querySelectorAll('.lst-check-completed');
for (let index = 0; index < listCheckBoxes.length; index++) {
    const element = listCheckBoxes[index];
    element.onchange = function (e) {
        console.log('event', e)
        const lstCompletedStatus = e.target.checked;
        const lstId = e.target.dataset['id'];
        fetch('/lists/'+ lstId + '/set-List-Completed', {
                method: 'POST',
                body: JSON.stringify({
                    'listcompleted': lstCompletedStatus
                }),
                headers : {
                    'Content-Type': 'application/json'
                }   
        })
        .then(function () {
                document.getElementById('m-error').className = 'hidden';
                window.location.reload(true);
            })
        .catch(function () {
                document.getElementById('m-error').className = '';
        })
    }
}