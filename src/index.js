import './index.css'

/*
Aufgaben:
1. Erstelle ein Eingabefeld und einen Button um ein neues Todo hinzuzufügen
2. Implementiere die Logik für das Hinzufügen, wenn der Button gedrückt wird
3. Speichere die Todos in einem Array und zeige die Inhalte im 'todo-list' div an
4. Füge eine Möglichkeit zum Löschen von Todos hinzu
5. Speichere die Todos ab, sodass Sie beim Neuladen der Seite angezeigt werden können
*/

const TODOS_KEY = 'todos'

const input = document.getElementById('todoInput')
const submitBtn = document.getElementById('submit')
const todoList = document.getElementById('todoList')
let todos = []

const saveTodos = () => {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
}

const addTodo = () => {
  const todoText = input.value
  if (todoText) {
    todos.push(todoText)
    renderNewTodo(todoText)
    input.value = ''
    saveTodos()
  }
}

const removeTodo = ({ todoItem, todo }) => {
  const indexToDelete = todos.findIndex(el => el === todo)
  todos.splice(indexToDelete, 1)
  todoItem.remove()
  saveTodos()
}

const renderNewTodo = (todo) => {
  const todoItem = document.createElement('div')
  todoItem.classList.add('todo-item')
  todoItem.innerHTML = `${todo}<button class="todo-delete">Löschen</button>`
  todoList.appendChild(todoItem)
  const deleteButton = todoItem.getElementsByTagName('button')[0]
  deleteButton.addEventListener('click', removeTodo.bind(this, { todoItem, todo }))
}

const init = () => {
  submitBtn.addEventListener('click', addTodo)

  const savedTodos = JSON.parse(localStorage.getItem(TODOS_KEY))
  if (savedTodos && savedTodos.length > 0) {
    todos = savedTodos
    savedTodos.forEach(todo => renderNewTodo(todo))
  }
}

init()