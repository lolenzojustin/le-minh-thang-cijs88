import React, { useEffect, useState } from 'react';
import './App.css';
import { Button, Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [firstLoad, setFirstLoad] = useState(false);
  const [filter, setFilter] = useState('All');
  const [activeButton, setActiveButton] = useState('All');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
    setFirstLoad(true);
  }, []);

  useEffect(() => {
    if (firstLoad) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);
  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([
        ...tasks,
        { id: Date.now(), text: newTask, completed: false },
      ]);
    }
  };
  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );
    setTasks(updatedTasks);
  };
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(
      (task) => task.id !== id
    );
    setTasks(updatedTasks);
  };
  const deleteAllCompleted = () => {
    setTasks([]);
  };
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    if (filter === 'Active') return !task.completed;
    if (filter === 'Complete') return task.completed;
    return false;
  });

  return (
    <div className="todolist">
      <h1>#todo</h1>
      <div className="container">
        <Button
          onClick={() => {
            setFilter('All');
            setActiveButton('All');
          }}
          type="default"
          className={
            activeButton === 'All'
              ? 'selected'
              : 'container1'
          }
        >
          All
        </Button>
        <Button
          onClick={() => {
            setFilter('Active');
            setActiveButton('Active');
          }}
          type="default"
          className={
            activeButton === 'Active' ? 'selected' : ''
          }
        >
          Active
        </Button>
        <Button
          onClick={() => {
            setFilter('Complete');
            setActiveButton('Complete');
          }}
          type="default"
          className={
            activeButton === 'Complete' ? 'selected' : ''
          }
        >
          Completed
        </Button>
      </div>
      <div className="input">
        <input
          placeholder="add details"
          type="text"
          onChange={(e) => setNewTask(e.target.value)}
          value={newTask}
        ></input>
        <Button type="primary" onClick={addTask} id="add">
          Add
        </Button>
      </div>
      <div>
        {filteredTasks.map((task) => (
          <div className="listtask" key={task.id}>
            <div>
              <Checkbox
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              ></Checkbox>
              <span
                className={
                  task.completed ? 'completed' : ''
                }
              >
                {task.text}
              </span>
            </div>
            <div>
              <button onClick={() => deleteTask(task.id)}>
                <DeleteOutlined />
              </button>
            </div>
          </div>
        ))}
      </div>
      {
        <Button
          type="primary"
          onClick={deleteAllCompleted}
          id="clear"
        >
          Clear
        </Button>
      }
    </div>
  );
}

export default App;
