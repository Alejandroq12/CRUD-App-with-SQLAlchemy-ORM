const descInput = document.getElementById('description');
document.getElementById('form').onsubmit = function(e) {
  e.preventDefault();
  const desc = descInput.value;
  descInput.value = '';
  fetch('/todos/create', {
    method: 'POST',
    body: JSON.stringify({
      'description': desc,
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then(jsonResponse => {
    console.log('response', jsonResponse);
    li = document.createElement('li');
    li.innerText = desc;
    document.getElementById('todos').appendChild(li);
    document.getElementById('error').className = 'hidden';
  })
  .catch(function() {
    document.getElementById('error').className = '';
  })
}