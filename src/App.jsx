import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

// useEffect
const App = () => {
  useEffect(() => {
    getUsers()
  }, [])

  // useRef
  const todo = useRef()

  // useState
  const [todos, setTodos] = useState([])

  // get user from backhand
  function getUsers() {
    axios.get('https://easy-ruby-dibbler-gear.cyclic.app/api/v1/users')
      .then((res) => {
        setTodos(res.data)
      })
      .catch((rej) => {
        console.log(rej);
      })

  }

  // Add todo  backhand
  function addTodo(e) {
    e.preventDefault()
    // console.log(todo.current.value);
    axios.post('https://easy-ruby-dibbler-gear.cyclic.app/api/v1/users', {
      title: todo.current.value,
    }).then((res) => {
      console.log(res.data);
      getUsers()
    }).catch((err) => {
      console.log(err);
    })
  }

  // delete todo from backhand
  function deletetodo(id) {
    console.log('delete', id);

    axios.delete(`https://easy-ruby-dibbler-gear.cyclic.app/api/v1/users/${id}`)
      .then((res) => {
        console.log(res.data);
        getUsers()
      }).catch((err) => {
        console.log(err);
      })
  }

  // edit todo at backhand
  function edittodo(id) {
    console.log('delete', id);
    const editPromt = prompt('Enter Updated text')
    // console.log(editPromt);

    axios.put(`https://easy-ruby-dibbler-gear.cyclic.app/api/v1/users/${id}`, {
      title: editPromt
    })
      .then((res) => {
        console.log(res.data);
        getUsers()
      }).catch((err) => {
        console.log(err);
      })
  }
  return (
    <>
      <h1 className='heading'>Todo App</h1>
      <form className='form' onSubmit={addTodo}>
        <input type="text" placeholder='Enter todo' ref={todo} />
        <button type='submit'>Add todo</button>
      </form>
      {todos.length > 0 ? todos.map((item) => {
        return <div key={item.id}>
          <div className='text-div'>
            <h2>{item.title}</h2>

            <div>
              <button onClick={() => deletetodo(item.id)}>delete</button>
              <button onClick={() => edittodo(item.id)}>edit</button>


            </div>
          </div>

        </div>
      }) : <h1>No todo found...</h1>}
    </>
  )
}

export default App