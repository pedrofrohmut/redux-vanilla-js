const ADD_TODO = "ADD_TODO"

const initialState = {
  todos: []
}

const appReducer = function(prevState = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      const newTodo = { text: action.payload }
      const newState = {
        ...prevState,
        todos: [ ...prevState.todos, newTodo ]
      }
      return newState
    default:
      return prevState
  }
}

const store = window.Redux.createStore(appReducer)

const createTodoLi = function(text) {
  const li = document.createElement("li")
  li.className = "list-group-item"
  li.textContent = text
  return li
}

const cleanTodoList = function() {
  const list = document.querySelector("#todos-list")
  while (list.firstChild) {
    list.removeChild(list.firstChild)
  }
}

const populateTodoList = function() {
  const todos = store.getState().todos
  todos.forEach(todo => {    
    document
      .querySelector("#todos-list")
      .appendChild(
        createTodoLi(todo.text)
      )
  })
}

const cleanFormInput = function() {
  const input = document.querySelector("#todo-text")
  input.value = ""
}

const refreshUI = function() {  
  cleanTodoList()
  populateTodoList()
  cleanFormInput()  
}

const unsubscribe = store.subscribe(refreshUI)

//######################################################################################

const createAddTodoAction = function(text) {
  return {
    type: ADD_TODO,
    payload: text
  }
}

const handleAddTodoSubmit = function(e) {
  e.preventDefault()
  const text = document.querySelector("#todo-text").value
  store.dispatch(createAddTodoAction(text))
}

document
  .querySelector("#todo-form")
  .addEventListener("submit", handleAddTodoSubmit)

// const handleWindowBlur = function(e) {
//   unsubscribe()
// }

// window
//   .addEventListener("blur", handleWindowBlur)