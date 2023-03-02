import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom/client"
import * as actions from "./store/actions"
import { initiateStore } from "./store/store"

const store = initiateStore()

const App = () => {
  const [state, setState] = useState(store.getState())

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState())
    })
  }, [])

  const completeTask = (taskId) => {
    store.dispatch(actions.taskCompleted(taskId))
  }

  const changeTitle = (taskId) => {
    store.dispatch(actions.titleChanged(taskId))
  }
  return (
    <>
      <h1> Hey!</h1>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => completeTask(el.id)}>complete</button>
            <button onClick={() => changeTitle(el.id)}>Change Title</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
