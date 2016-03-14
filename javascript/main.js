/* Instead of storing each todo as a string,
todos are stored as objects with title, description,
and isComplete properties */

var todos = []

var newTodoInput = document.getElementById('new-todo-input')
var todoList = document.getElementById('todo-list')
var numOfTodos = document.getElementById('number-of-todos')
var title = document.querySelector('#new-todo-input input[name=title]')
var description = document.querySelector('#new-todo-input input[name=description]')

function renderTodos () {
  todoList.innerHTML = todos.map(function (todo, index) {
    var string = '<li>' +
    '<label title=' + todo.description + '>' + todo.title + '</label>' +
    '<input type="checkbox" class="checkbox" data-index="' + index + '">' +
    ' <button class="remove-todo" data-index="' + index + '">X</button>'
    if (index === 0) {
      string += ' <button class="move-todo-down" data-index="' + index + '">&#8595</button>' +
      '</li>'
    } else if (index === todos.length - 1) {
      string += ' <button class="move-todo-up" data-index="' + index + '">&#8593</button>' +
      '</li>'
    } else {
      string += ' <button class="move-todo-up" data-index="' + index + '">&#8593</button>' +
      ' <button class="move-todo-down" data-index="' + index + '">&#8595</button>' +
      '</li>'
    }
    return string
  }).join('')
}

function renderNumberOfTodos () {
  numOfTodos.innerHTML = todos.length
}

function clearAll () {
  todos = []
  renderAll()
}

function renderAll () {
  renderTodos()
  renderNumberOfTodos()
  title.value = ''
  description.value = ''
  title.focus()
}

function randomTodo () {
  var rand = todos[Math.floor(Math.random() * todos.length)].title
  alert(rand)
  renderAll()
}

function isNotChecked (obj) {
  return !obj.isComplete
}

function clearChecked () {
  todos = todos.filter(isNotChecked)
  renderAll()
}

newTodoInput.onsubmit = function(event) {
  event.preventDefault()
  todos.push({
    title: title.value,
    description: description.value,
    isComplete: false
  })
  renderAll()
}

todoList.onclick = function (event) {
  var clickedElement = event.target
  var idx = clickedElement.dataset.index
  if (clickedElement.className === 'remove-todo') {
    todos.splice(idx, 1)
    renderAll()
  } else if (clickedElement.className === 'move-todo-up') {
    var temp = todos[idx]
    todos[idx] = todos[idx - 1]
    todos[idx - 1] = temp
    renderAll()
  } else if (clickedElement.className === 'move-todo-down') {
    var temp = todos[idx]
    todos[idx] = todos[idx - (-1)]
    todos[idx - (-1)] = temp
    renderAll()
  } else if (clickedElement.type === 'checkbox') {
    todos[idx].isComplete = clickedElement.checked
  }
}
