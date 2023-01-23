const checkboxes = document.querySelectorAll('.check-completed');
for (let i = 0; i < checkboxes.length; i++) {
  const checkbox = checkboxes[i];
  checkbox.onchange = function(e) {
    const newCompleted = e.target.checked;
    const todoId = e.target.dataset['id'];
    fetch('/todos/' + todoId + '/set-completed', {
      method: 'POST',
      body: JSON.stringify({
        'completed': newCompleted
    }),
    headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function() {
      document.getElementById('error').className = 'hidden';
    })
    .catch(function() {
      document.getElementById('error').className = '';
    })
  }
}

const deleteBtns = document.querySelectorAll('.delete-button');
    for (let i = 0; i < deleteBtns.length; i++) {
        const btn = deleteBtns[i];
        btn.onclick = function(e) {
            const todoId = e.target.dataset['id'];
            fetch('/todos/' + todoId, {
                method: 'DELETE'
            });
        }
    }

document.getElementById('form').onsubmit = function(e) {
  e.preventDefault();
  fetch('/todos/create', {
    method: 'POST',
    body: JSON.stringify({
      'description': document.getElementById('description').value
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(jsonResponse) {
    console.log(jsonResponse);
    const liItem = document.createElement('LI');
    liItem.innerHTML = jsonResponse['description'];
    document.getElementById('todos').appendChild(liItem);
    document.getElementById('error').className = 'hidden';
  })
  .catch(function() {
    document.getElementById('error').className = '';
  })
}