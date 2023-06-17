
import UseLocalStorage from '../hooks/UseLocalStorage';

function TodoApp() {
  const [todos, setTodos] = UseLocalStorage('todos', []);
  const [inputTitle, setInputTitle] = UseLocalStorage('inputTitle', '');
  const [inputDescription, setInputDescription] = UseLocalStorage('inputDescription', '');

  // useEffect(() => {
  //   const savedTodos = localStorage.getItem('todos');
  //   if (savedTodos) {
  //     setTodos(JSON.parse(savedTodos));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('todos', JSON.stringify(todos));
  // }, [todos]);

  const handleTitleChange = (e) => {
    setInputTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setInputDescription(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputTitle.trim() && inputDescription.trim()) {
      const newTodo = {
        id: new Date().getTime(),
        title: inputTitle,
        description: inputDescription,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputTitle('');
      setInputDescription('');
    }
  };

  const handleTodoDelete = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
  };

  const handleTodoToggle = (todoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Todo App</h1>
      <form onSubmit={handleFormSubmit}>
        <div className='mb-3'>
        <input
          type="text"
          value={inputTitle}
          onChange={handleTitleChange}
          placeholder="Enter a title..."
          className='form-control mb-3'
        />
        <input
          type="text"
          value={inputDescription}
          onChange={handleDescriptionChange}
          placeholder="Enter a description..."
          className='form-control'
        />
        </div>
        <button type="submit" className='btn btn-primary'>Add Todo</button>
      </form>
      <ul className='mt-4'>
        {todos.map((todo) => (
          <div className='border border-sucess mb-4 p-4'>
          <li key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <button onClick={() => handleTodoToggle(todo.id)} className="btn btn-success m-3">
              {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>
            <button onClick={() => handleTodoDelete(todo.id)} className="btn btn-warning">Delete</button>
          </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
