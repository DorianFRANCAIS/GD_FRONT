import React, { useState } from 'react'
import FullCalendar, { DateInput, formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Button, Checkbox, Modal, Paper, TextInput } from '@mantine/core'
import frLocale from '@fullcalendar/core/locales/fr'
import { TimeRangeInput } from '@mantine/dates'
import dayjs from 'dayjs';
import { format } from "date-fns";
import useMyCalendarStyles from './MyCalendar.style'
import styled from "@emotion/styled";


export const StyleWrapper = styled.div`
  .fc-button.fc-prev-button, .fc-button.fc-next-button, .fc-button.fc-button-primary{
    background: #be4bdb;
    background-image: none;
    box-shadow: none;
}
  .fc-button.fc-prev-button:focus:active, .fc-button.fc-next-button:focus:active, .fc-button.fc-button-primary:focus:active{
    background: #9a4bdb;
    box-shadow: none;
}
@media only screen and (max-width: 800px) {
  .fc-button.fc-button-primary{
    display: none
  }
  .fc-button.fc-prev-button, .fc-button.fc-next-button{
    display: inline-block;
  }
}
`


let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '')

const createEventId = () => {
  return String(eventGuid++)
}

const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00',
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T15:30:00',
    end: todayStr + 'T16:30:00',
  }
]


export const MyCalendar = () => {

  const { classes } = useMyCalendarStyles();

  const defaultTask = {
    view: { calendar: { addEvent: ({ }) => { } } },
    startStr: '',
    endStr: '',
    allDay: '',
    start: Date(),
  }

  const defaultClickInfo = {
    event: {
      remove: () => { },
      title: '',
      start: 0,
      end: 0,
    },
  }

  const [weekendsVisible, editWeekendsVisible] = useState(false);
  const [allEvents, editAllEvents] = useState(false);
  const [currentEvents, editCurrentEvents] = useState([]);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalRemove, setModalRemove] = useState(false);
  const [selectInfo, editSelectInfo] = useState(defaultTask);
  const [clickInfo, editClickInfo] = useState(defaultClickInfo);
  const [task, setTask] = useState('');
  const now = new Date();
  const then = dayjs(now).add(30, 'minutes').toDate();
  const [hour, setHour] = useState<[Date, Date]>([now, then]);

  const renderEventContent = (eventInfo: { event: any }) => {

    return (
      <>
        <b>{format(eventInfo.event?.start, "HH:mm").toString()}</b>
        {eventInfo.event?.end && (
          <>
            -
            <b>{format(eventInfo.event?.end, "HH:mm").toString()}</b>
          </>
        )}
        <i className={classes.eventTitle}>{eventInfo.event.title}</i>
      </>
    )
  }
  
  const renderSidebarEvent = (event: any) => {
    return (
      <li key={event.id}>
        <b>{format(event?.start, "HH:mm").toString()}</b>
        {event?.end && (
          <>
            -
            <b>{format(event?.end, "HH:mm").toString()}</b>
          </>
        )}
        <i>  {event.title}</i>
      </li>
    )
  }

  const addModal = () => {
    const submitModal = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (task.length, selectInfo.startStr.length) {
        selectInfo?.view.calendar.addEvent({
          id: createEventId(),
          title: task,
          start: selectInfo?.startStr + 'T' + hour[0].getHours() + ':' + hour[0].getMinutes() + ':00',
          end: selectInfo?.startStr + 'T' + hour[1].getHours() + ':' + hour[1].getMinutes() + ':00',
        })
        setTask('')
        onClose()
      }
    };
    const onClose = () => {
      setModalAdd(false)
      editSelectInfo(defaultTask)
    }

    return (
      <Modal
        opened={modalAdd}
        onClose={() => onClose()}
        title="Ajouter un rdv"
        shadow="md"
        radius="lg"
      >
        <form onSubmit={e => submitModal(e)}>
          <TextInput
            label="Ma tâche"
            name="title"
            placeholder="Ma tâche"
            value={task}
            onChange={(event) => setTask(event.currentTarget.value)}
            required
          />
          <TimeRangeInput
            label="Appointment time"
            value={hour}
            onChange={setHour}
            clearable
          />
          <Button type="submit" color="violet.6" radius="lg" fullWidth mt="xl">
            Ajouter
          </Button>
        </form>
      </Modal>
    )
  }

  const removeModal = () => {
    const submit = () => {
      clickInfo.event.remove()
      onClose()
    };
    const onClose = () => {
      setModalRemove(false)
      editClickInfo(clickInfo)
    }

    return (
      <Modal
        opened={modalRemove}
        onClose={() => onClose()}
        title="Détail de l'événement"
      >
        Titre: <b>{clickInfo.event.title}</b>
        <br/>
        Date: <b>{format(clickInfo.event?.start, "HH:mm").toString()}</b>
        {clickInfo.event?.end && (
          <>
            -
            <b>{format(clickInfo.event?.end, "HH:mm").toString()}</b>
          </>
        )}
        <Button color="violet.6" radius="lg" fullWidth mt="xl" onClick={submit}>
          Supprimer cet événement
        </Button>
      </Modal>
    )
  }


  const renderSidebar = () => {
    return (
      <div className=''>
        <div className=''>
            <Checkbox
              checked={!!weekendsVisible}
              onChange={handleWeekendsToggle}
              label='Voir les week-ends'
              color="grape"
            ></Checkbox>
            <Checkbox
              checked={!!allEvents}
              onChange={handleAllEventToggle}
              label='Voir tous les événements'
              color="grape"
            ></Checkbox>
        </div>
        { allEvents && (
        <div className=''>
          <h2>Tous les événements: ({currentEvents.length})</h2>
          <ul>
            {currentEvents.map(renderSidebarEvent)}
          </ul>
        </div>
        )}
      </div>
    )
  }

  const handleWeekendsToggle = () => editWeekendsVisible(!weekendsVisible)
  const handleAllEventToggle = () => editAllEvents(!allEvents)


  const handleDateSelect = (selectInfo: { view: { calendar: any }; start: any, startStr: any; endStr: any; allDay: any }) => {
    setModalAdd(true)
    editSelectInfo(selectInfo);
    selectInfo.view.calendar.unselect()
  }

  const handleEventClick = (clickInfo: { event: any }) => {
    setModalRemove(true)
    editClickInfo(clickInfo);
  }

  const handleEvents = (events: any) => {
    editCurrentEvents(events)
  }



  return (
    <div>
      {renderSidebar()}
      {addModal()}
      {removeModal()}

      <div>
      <StyleWrapper>
        <FullCalendar
          locale={frLocale}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin ]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={!!weekendsVisible}
          initialEvents={INITIAL_EVENTS}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
        /*
        eventAdd={function(){}}
        eventChange={function(){}}
        eventRemove={function(){}}
        */
        />
      </StyleWrapper>

      </div>
    </div>
  )

}


export default MyCalendar;
