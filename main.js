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

store.subscribe(() => {
  
  cleanList()

  const todos = store.getState().todos
  todos.forEach(todo => {
    const li = document.createElement("li")
    li.className = "list-group-item"
    li.textContent = todo.text
    document
      .querySelector("#todos-list")
      .appendChild(li)
  })
})


//######################################################################################

function cleanList() {
  const list = document.querySelector("#todos-list")
  while (list.firstChild) {
    list.removeChild(list.firstChild)
  }
}

document
  .querySelector("#todo-form")
  .addEventListener("submit", function(e) {
    e.preventDefault()
    const text = document.querySelector("#todo-text").value
    const actionAddTodo = {
      type: ADD_TODO,
      payload: text
    }
    store.dispatch(actionAddTodo)
  })