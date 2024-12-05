import React, { useState, useCallback } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../styles/TodoApp.css'

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', color: '#555' });
  const [showCard, setShowCard] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const navigate = useNavigate();

  const columns = {
    todo: [],
    doing: [],
    done: []
  };

  tasks.forEach(task => columns[task.status].push(task));

  const createTask = () => {
    setIsCreating(true);
    setTimeout(() => setShowCard(true), 10);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const saveTask = (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString();
    const newTaskWithId = { ...newTask, id: Date.now().toString(), status: 'todo', date: currentDate };
    setTasks((prevTasks) => [...prevTasks, newTaskWithId]);
    setIsCreating(false);
    setShowCard(false);
    setNewTask({ title: '', description: '', color: '#555' });
  };

  const moveToInProgress = (taskId) => {
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === taskId ? { ...task, status: 'doing' } : task
    ));
    setTaskToEdit(null);
  };

  const moveToDone = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: 'done' } : task
      )
    );
    setTaskToEdit(null);
  };

  const handleTaskClick = useCallback((task) => {
    setIsCreating(false)
    setTaskToEdit(task);
  }, []);

  const handleTaskClose = () => {
    setTaskToEdit(null);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setTasks((prevTasks) => {
        const oldIndex = prevTasks.findIndex(task => task.id === active.id);
        const newIndex = prevTasks.findIndex(task => task.id === over.id);
        return arrayMove(prevTasks, oldIndex, newIndex);
      });
    }

    const activeTask = tasks.find(task => task.id === active.id);
    const overTask = tasks.find(task => task.id === over.id);

    if (activeTask.status !== overTask.status) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === active.id ? { ...task, status: overTask.status } : task
        )
      );
    }
  };

  return (
    <>
      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
        <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '5px' }} /> Volver
      </button>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className='container2'>
          {['todo', 'doing', 'done'].map((columnId) => (
            <div className='list' key={columnId} id={columnId}>
              {columnId === 'todo' ? 'Tareas por hacer' : columnId === 'doing' ? 'Tareas en proceso' : 'Tareas finalizadas'} <hr />
              {columnId === 'todo' && (
                <button style={{ width: '100%', backgroundColor: '#3557', color: '#fff', fontSize: '20px', border: 'none', cursor: 'pointer' }} onClick={createTask}>+</button>
              )}
              <SortableContext items={columns[columnId].map(task => task.id)} strategy={verticalListSortingStrategy}>
                {columns[columnId].map((task) => (
                  <SortableTask key={task.id} task={task} onClick={() => handleTaskClick(task)} />
                ))}
              </SortableContext>
            </div>
          ))}
        </div>
      </DndContext>

      {isCreating && (
        <div className={`task-card2 ${showCard ? 'show2' : ''}`}>
          <form onSubmit={saveTask}>
            <label>
              Título 
              <input type='text' name='title' value={newTask.title} onChange={handleChange} required />
            </label>
            <label>
              Descripción
              <textarea name='description' value={newTask.description} onChange={handleChange} required />
            </label>
            <label style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              Color:
              <input type='color' name='color' value={newTask.color} onChange={handleChange} required />
            </label><br />
            <div style={{display:'flex', justifyContent: 'center', gap: 25}}>
              <button className='button-todo' type='submit'>Guardar</button>
              <button className='button-todo' type='submit' onClick={() => setIsCreating(false)}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      {taskToEdit && (
        <div className={`task-detail-card2 show2`} style={{ backgroundColor: taskToEdit.color }}>
        <div>
          <h2>{taskToEdit.title}</h2>
          <hr />
          <p>{taskToEdit.description}</p>
          <hr />
          <p>Fecha de creación: {new Date(taskToEdit.date).toLocaleDateString()}</p>
          <div style={{display:'flex', justifyContent: 'center', gap: 25}}>
            {taskToEdit.status === 'doing' && (
              <button className='button-todo' onClick={() => moveToDone(taskToEdit.id)}>Finalizar tarea</button>
            )}
            {taskToEdit.status === 'todo' && (
              <button className='button-todo' onClick={() => moveToInProgress(taskToEdit.id)}>Realizar tarea</button>
            )}
            <button className='button-todo' onClick={handleTaskClose}>Cerrar</button>
          </div>
      </div>
    </div>
      )}
    </>
  );
}

const SortableTask = React.memo(({ task, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: task.color,
    display: 'flex',
    justifyContent: 'space-around',
    
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`task ${task.entering ? 'new' : 'new-entered'}`}
      onClick={onClick}
    >
      {task.title}
      <span className="drag-handle" {...attributes} {...listeners}>
        <FontAwesomeIcon icon={faThumbtack} />
      </span>
    </div>
  );
});

export default TodoApp;