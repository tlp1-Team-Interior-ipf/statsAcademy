import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/Calendar.css';
import 'moment/locale/es'
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

moment.locale('es');

const customMessages = {
  today: 'Fecha actual',
  previous: 'Atrás',
  next: 'Siguiente',
};

const localizer = momentLocalizer(moment);

Modal.setAppElement('#root'); // Configura el elemento principal de tu aplicación para accesibilidad

function Calendario(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewSelectedDate, setViewSelectedDate] = useState(null);
  const [note, setNote] = useState({ title: '', description: '', time: '' });
  const [notes, setNotes] = useState({}); // Estado para almacenar las notas por fecha

  const navigate = useNavigate();

useEffect(() => {
  if (Notification.permission !== 'granted') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Permiso de notificación concedido.');
      } else {
        console.log('Permiso de notificación denegado.');
      }
    });
  } else {
    console.log('Permiso de notificación ya concedido.');
  }
}, []);

  const handleSelectSlot = (slotInfo) => {
    if(viewModalIsOpen){
      setViewModalIsOpen(false)
    }

    const now = new Date();
    const startDate = new Date(slotInfo.start);
    const isCurrentMonth = startDate.getMonth() === now.getMonth() && startDate.getFullYear() === now.getFullYear();

    if (!isCurrentMonth) {
      Swal.fire({
        title: 'Fecha no válida',
        text: 'Solo se pueden seleccionar fechas del mes actual.',
        icon: 'warning'
      });
      return;
    }

    setSelectedDate(slotInfo.start);
    setModalIsOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNote(prevNotes => ({
      ...prevNotes,
      [name]: value
    }));
  };

  const handleSaveNote = () => {
    if(!selectedDate){
      console.error("datos nulos")
      return
    }

    console.log("datos no nulos: ", selectedDate)
    const dateKey = selectedDate.toISOString().split('T')[0];

    setNotes(prevNotes => {
      const notesForDate = prevNotes[dateKey] || [];
      
        if(note.description === '' || note.time === ''|| note.title === ''){
          console.error("Nota vacia");
          Swal.fire({
            title: 'Error',
            text: 'La nota no debe tener campos vacíos',
            icon: 'error'
          })
          return prevNotes
        }

        const newNotes = {
          ...prevNotes,
          [dateKey]: [...notesForDate, note]
        };

        scheduleNotification(selectedDate, note);

        return newNotes;

    });
    setModalIsOpen(false);
    setNote({ title: '', description: '', time: '' }); // Resetear la nota una vez creada
  };

const scheduleNotification = (date, note) => {
  const now = new Date();
  const notificationDate = new Date(date);
  const [hours, minutes] = note.time.split(':').map(Number);
  notificationDate.setHours(hours, minutes, 0, 0);

  // Restar un día (24 horas)
  notificationDate.setDate(notificationDate.getDate() - 1);

  const timeToNotification = notificationDate - now;
  console.log('Fecha actual:', now);
  console.log('Fecha de notificación:', notificationDate);
  console.log('Tiempo hasta la notificación (ms):', timeToNotification);

  if (timeToNotification > 0) {
    setTimeout(() => {
      console.log('Mostrando notificación');
      if (Notification.permission === 'granted') {
        new Notification('Recordatorio de Tarea', {
          body: `La tarea "${note.title}" está próxima a vencerse.`,
        });
        Swal.fire({
          title: 'Recordatorio',
          text: `La tarea "${note.title}" está próxima a vencerse.`,
          icon: 'warning'
        })
      } else {
        console.log('Permiso de notificación no concedido');
      }
    }, timeToNotification);
  } else {
    console.log('El tiempo para la notificación ya ha pasado.');
  }
};

  const renderNotes = (date) => {
    if(!date){
      return <p>No hay notitas</p>
    }
    const dateKey = date.toISOString().split('T')[0];
    
    const notesForDate = notes[dateKey] || [];
    return (

      <div >

        <h3>Notas para {dateKey}</h3>
        {notesForDate.length > 0 ? (
          
          <ul style={{listStyle: 'none', padding: '10px', backgroundColor: '#fff', overflow: 'auto', height: '300px'}}>

            {notesForDate.map((note, index) => (
              
              <>
                <li style={{display: 'flex', flexDirection: 'column', border: '2px solid #000', borderRadius: '5px' ,margin: '10px', backgroundColor: '#fff', color: '#000'}} key={index}>
                <p><strong> Titulo:</strong> {note.title}</p>
                <p><strong> Descripción:</strong> {note.description}</p>
                <p> <strong>Horario:</strong> {note.time}</p>
              </li>
              </>
            ))}
          </ul>

        ) : (
          <p>No hay notas para esta fecha.</p>
        )}
      </div>
    );
  };
  const eventPropGetter = (event) => {
    const dateKey = event.start.toISOString().split('T')[0];
    const notesForDate = notes[dateKey] || [];
    if(notesForDate > 0){
      return {
        className: 'note-day'
      };
    }
    return {}
  };

  const DateCellWrapper = ({ value }) => {
    const dateKey = value.toISOString().split('T')[0];
    const notesForDate = notes[dateKey] || [];

    return(
      <div className='rbc-day-bg' style={{position: 'relative'}}>
        { notesForDate.length > 0 && (

            <div 
              className='note-icon-container'
              style={{
                position: 'absolute',
                top: '5px' ,
                left: '5px',
                zIndex: '10', 
              }}
            >
              📝
            </div>
          )
        }
      </div>
    )
  };

  return (
    <div >
      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
        <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '5px' }} /> Volver
      </button>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 640, width: '80%', margin: 'auto', border: 'none', color: '#000', borderRadius: 10 }}
        messages={customMessages}
        selectable
        onSelectSlot={handleSelectSlot}
        onView={() => {}}
        views={['month']} 
        onSelecting={() => false} 
        components={{
          dateCellWrapper: DateCellWrapper,
        }}
        eventPropGetter={eventPropGetter}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Agregar Nota"
        className="modal"
        overlayClassName="modal-overlay"
      >

        <div className='modal-content'>
          <h2>Agregar Nota</h2>
          <form>
            <div>
              <label>Título:</label>
              <input
                className='input'
                type="text"
                name="title"
                value={note.title}
                onChange={handleInputChange}
              />
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <label>Descripción:</label>
              <textarea
                className='input'
                name="description"
                value={note.description}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Horario:</label>
              <input
                className='input'
                type="time"
                name="time"
                value={note.time}
                onChange={handleInputChange}
              />
            </div>
            <button className='button' type="button" onClick={handleSaveNote}>Guardar</button>
          </form>
          <p
            style={{
              cursor: 'pointer',
              color: '#555',
              marginTop: '10px'
            }}
            onClick={() => {
              setModalIsOpen(false);
              setViewSelectedDate(selectedDate)
              setViewModalIsOpen(true)
            }}
            
          >
            Ver tareas asignadas a esta fecha
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={viewModalIsOpen}
        onRequestClose={() => setViewModalIsOpen(false)}
        contentLabel="Ver Notas"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className='modal-content'>
          {renderNotes(viewSelectedDate)}
        </div>
      </Modal>
    </div>
  );
};

export default Calendario;