var todos = []

var newTodoInput = document.getElementById('new-todo-input')
var todoList = document.getElementById('todo-list')
var numOfTodos = document.getElementById('number-of-todos')

function renderTodos() {
  todoList.innerHTML = todos.map(function(todo, index) {
    return '<li>' +
      todo +
      ' <button class="remove-todo" data-index="' + index + '">X</button>' +
      ' <button class="move-todo-up" data-index="' + index + '">&#8593</button>' +
      ' <button class="move-todo-down" data-index="' + index + '">&#8595</button>' +
    '</li>'
  }).join('')
}

function numberOfTodos(){
  numOfTodos.innerHTML = todos.length
}
numberOfTodos()

Array.prototype.move = function (old_index, new_index) {
    while (old_index < 0) {
        old_index += this.length;
    }
    while (new_index < 0) {
        new_index += this.length;
    }

    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
};

newTodoInput.onkeypress = function(event) {
  if (event.which === 13) {
    todos.push(this.value)
    this.value = ''
    renderTodos()
    numberOfTodos()
  }
}

todoList.onclick = function(event) {
  var clickedElement = event.target
  var idx = clickedElement.dataset.index
  if (clickedElement.className === 'remove-todo') {
    todos.splice(idx, 1)
    renderTodos()
    numberOfTodos()
  } else if (clickedElement.className === 'move-todo-up') {
    todos.move(idx, idx-1)
  } else if (clickedElement.className === 'move-todo-down') {
    todos.move(idx-todos.length, idx-todos.length+1)
  }
}

document.body.onclick = function(event){
  var clickedElement = event.target
  if (clickedElement.className === 'clear-all'){
    todos = []
  } else if (clickedElement.className ==='random-todo') {
    var rand = todos[Math.floor(Math.random()*todos.length)]
    alert(rand)
  }
  renderTodos()
  numberOfTodos()
}
