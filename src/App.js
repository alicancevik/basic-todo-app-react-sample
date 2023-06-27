import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import TodoList from './TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current)
      return;

    dataFetchedRef.current = true;
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5065/api/todos');
      console.log("response fetch", response);
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await axios.post('http://localhost:5065/api/todos', {
        title: newTodo,
        completed: false,
      });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleComplete = async (id) => {
    try {
      await axios.put(`http://localhost:5065/api/todos/complete/${id}`, {});
      fetchTodos(); // Görevleri yeniden getirme
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodo = async (id, title) => {
    try {
      await axios.put(`http://localhost:5065/api/todos/${id}`, {
        title: title,
      });
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, title: title };
        }
        return todo;
      });
      setTodos(updatedTodos);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5065/api/todos/${id}`);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <section className="vh-100" style={{ backgroundColor:'#FFF'}}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card rounded-3">
                <div className="card-body p-4">

                  <h4 className="text-center my-3 pb-3">To Do App</h4>

                  <form className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">

                    <div className="col-12">
                      <div className="form-outline">
                        <input
                          type="text"
                          className='form-control'
                          value={newTodo}
                          onChange={(e) => setNewTodo(e.target.value)}
                          placeholder="Yeni görev ekle..."
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <button type='button' className='btn btn-primary' onClick={addTodo}>Ekle</button>
                    </div>

                  </form>

                  

                  <table className="table mb-4">
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Görev</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <TodoList todos={todos} onUpdate={updateTodo} onDelete={deleteTodo} onComplete={handleComplete} /> 
                    </tbody>
                  </table>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      

      
    </div>
  );
}

export default App;
