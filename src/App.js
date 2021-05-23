import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

function TodoForm({ title, project, onCancel, onSubmit }) {
  const [inputTitle, setInputTitle] = useState(title || "");
  const [inputProject, setInputProject] = useState(project || "");

  const handleTitleChange = event => setInputTitle(event.target.value);

  const handleProjectChange = event => setInputProject(event.target.value);

  const handleSubmit = () => onSubmit(inputTitle, inputProject);

  return (
    <div className='ui centered card'>
      <div className='content'>
        <div className='ui form'>
          <div className='field'>
            <label>Title</label>
            <input type='text' value={inputTitle} onChange={handleTitleChange} />
          </div>
          <div className='field'>
            <label>Project</label>
            <input type='text' value={inputProject} onChange={handleProjectChange} />
          </div>
          <div className='ui two bottom attached buttons'>
            <button
              onClick={handleSubmit}
              className='ui basic blue button'
            >
              {inputTitle ? "Update" : "Create"}
            </button>
            <button
              onClick={onCancel}
              className='ui basic red button'
            >
              Cancel
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Todo({ title, project, id, onDelete, onEdit }) {
  const handleDelete = () => onDelete(id);

  return (
    <div className='ui centered card'>
      <div className='content'>
        <div className='header'>
          {title}
        </div>
        <div className='meta'>
          {project}
        </div>
        <div className='extra content'>
          <span
            onClick={onEdit}
            className='right floated edit icon'
          >
            <i className='edit icon' />
          </span>
          <span
            onClick={handleDelete}
            className='right floated trash icon'
          >
            <i className='trash icon' />
          </span>
        </div>
      </div>
    </div>
  );
}

function EditableTodo({ title, project, id, onDelete, onSubmit }) {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => setIsEdit(true);

  const handleCancel = () => setIsEdit(false);

  const handleEditSubmit = (inputTitle, inputProject) => {
    onSubmit(inputTitle, inputProject, id);
    setIsEdit(false);
  }

  return isEdit ? (
    <TodoForm
      title={title}
      project={project}
      onCancel={handleCancel}
      onSubmit={handleEditSubmit}
    />
  ) : (
    <Todo
      id={id}
      title={title}
      project={project}
      onDelete={onDelete}
      onEdit={handleEdit}
    />
  );
}

function EditableTodoList({ todos, onDelete, onEditSubmit }) {
  return todos.map(todo => (
    <EditableTodo
      key={todo.id}
      id={todo.id}
      title={todo.title}
      project={todo.project}
      onDelete={onDelete}
      onSubmit={onEditSubmit}
    />)
  )
}

function ToggleableAddButton({ onAddSubmit }) {
  const [isAdd, setIsAdd] = useState(false);

  const handleAdd = () => setIsAdd(true);

  const handleCancel = () => setIsAdd(false);

  const handleSubmit = (title, project) => {
    onAddSubmit(title, project);
    setIsAdd(false);
  }

  return isAdd ? (
    <TodoForm onCancel={handleCancel} onSubmit={handleSubmit} />
  ) : (
    <div className='ui basic content center aligned segment'>
      <button
        onClick={handleAdd}
        className='ui basic button icon'>
        <i className='plus icon' />
      </button>
    </div>
  );
}

function App() {
  const initialValues = [
    {
      title: 'Clean up files',
      project: 'Office Chores',
      id: uuidv4(),
    },
    {
      title: 'Walk dog',
      project: 'Life Chores',
      id: uuidv4(),
    },
  ];

  const [todos, setTodos] = useState(initialValues);

  const handleAddSubmit = (title, project) => {
    const newTodo = {
      title,
      project,
      id: uuidv4(),
    };
    setTodos(todos.concat(newTodo));
  };

  const handleDelete = id => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };

  const handleEditSubmit = (title, project, id) => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          title,
          project,
        }
      } else {
        return todo;
      }
    });
    setTodos(newTodos);
  };

  return (
    <div className='ui three column centered grid'>
      <div className='column'>
        <EditableTodoList todos={todos} onDelete={handleDelete} onEditSubmit={handleEditSubmit} />
        <ToggleableAddButton onAddSubmit={handleAddSubmit} />
      </div>
    </div>
  );
}

export default App;

