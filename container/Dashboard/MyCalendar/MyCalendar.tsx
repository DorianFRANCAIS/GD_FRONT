import React, { forwardRef, useEffect, useState } from 'react'
import FullCalendar, { DateInput, formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Button, Checkbox, Modal, Paper, Select, Textarea, TextInput } from '@mantine/core'
import frLocale from '@fullcalendar/core/locales/fr'
import { TimeRangeInput } from '@mantine/dates'
import dayjs from 'dayjs';
import { format } from "date-fns";
import useMyCalendarStyles from './MyCalendar.style'
import styled from "@emotion/styled";
import Cookie from 'js-cookie';



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

const createEventId = () => {
  return String(eventGuid++)
}

export const MyCalendar = () => {
  const defaultTask = {
    view: { calendar: { addEvent: ({}) => {} } },
    startStr: '',
    endStr: '',
    allDay: '',
    start: Date(),
  }

  const defaultClickInfo = {
    view: { calendar: { addEvent: ({}) => {} } },
    event: {
      remove: () => {},
      title: '',
      start: 0,
      end: 0,
      id: 0,
      startStr: '',
      endStr: '',
      extendedProps: {
        educatorId: 0,
        activityTypeId: 0,
      },
    },
  }

  const [allUser, setAllUser] = useState([]);
  const [allActivity, setAllActivity] = useState([]);
  const { classes } = useMyCalendarStyles();
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
  const [valueUser, setValueUser] = useState<string | null>(null);
  const [valueActivity, setValueActivity] = useState<string | null>(null);



  useEffect(() => {
    getAllUser();
    getAllActivity();
  }, []);

  const getAllUser = async () => {
    setAllUser(await getApiUser())
  }

  const getAllActivity = async () => {
    setAllActivity(await getApiActivity())
  }

  const getInitialEvents = async () => {
    const events = await getApi();
    const tab = events.map((e: any) => {
      return {
        id: e.id,
        title: e.report,
        start: e.beginDate?.replace('.000Z', ''),
        end: e.endDate?.replace('.000Z', ''),
        extendedProps: {
          educatorId: e.educatorId,
          activityTypeId: e.activityTypeId,
        },
      }
    })
    return tab
  }

  const renderEventContent = (eventInfo: { event: any }) => {
    const id = eventInfo?.event?.extendedProps?.educatorId
    const user: any = allUser.filter((u: any) => u.id === id)[0]
    return (
      <>
        <b>{format(eventInfo.event?.start, "HH:mm").toString()}</b>
        {eventInfo.event?.end && (
          <>
            -
            <b>{format(eventInfo.event?.end, "HH:mm").toString()}</b>
          </>
        )}
        <i className={classes.eventTitle}>
          {user?.name}
        </i>
      </>
    )
  }

  const renderSidebarEvent = (event: any) => {
    const id = event?.extendedProps?.educatorId
    const user: any = allUser.filter((u: any) => u.id === id)[0]
    return (
      <li key={event.id}>
        <b>{format(event?.start, "HH:mm").toString()}</b>
        {event?.end && (
          <>
            -
            <b>{format(event?.end, "HH:mm").toString()}</b>
          </>
        )}
        <i>  {user?.name}</i>
      </li>
    )
  }

  const addZero = (i: any) => {
    if (i < 10) { i = "0" + i }
    return i;
  }

  const addModal = () => {
    const userClean = allUser?.map((u: any) => {
      return {
        value: u.id,
        label: u.name
      }
    })

    const activityClean = allActivity?.map((u: any) => {
      return {
        value: u.id,
        label: u.title
      }
    })

    const submitModal = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (task.length, selectInfo.startStr.length) {
        const data = await addApi({
          educatorId: valueUser,
          activityTypeId: valueActivity,
          report: task,
          beginDate: selectInfo?.startStr + 'T' + addZero(hour[0].getHours()) + ':' + addZero(hour[0].getMinutes()) + ':00.511Z',
          endDate: selectInfo?.startStr + 'T' + addZero(hour[1].getHours()) + ':' + addZero(hour[1].getMinutes()) + ':00.511Z',
        })
        selectInfo?.view.calendar.addEvent({
          id: data?.id,
          title: task,
          start: selectInfo?.startStr + 'T' + addZero(hour[0].getHours()) + ':' + addZero(hour[0].getMinutes()) + ':00',
          end: selectInfo?.startStr + 'T' + addZero(hour[1].getHours()) + ':' + addZero(hour[1].getMinutes()) + ':00',
          extendedProps: {
            educatorId: valueUser,
            activityTypeId: valueActivity,
          },
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
        <Textarea
            label="Rapport"
            name="title"
            placeholder="Mon Rapport"
            value={task}
            onChange={(event) => setTask(event.currentTarget.value)}
            required
          />
          <TimeRangeInput
            label="Appointment time"
            value={hour}
            onChange={setHour}
          />
          <Select
            label="L'éducateur en chef"
            placeholder="En choisir un"
            onChange={setValueUser}
            data={userClean}
          />
          <Select
            label="L'activité"
            placeholder="En choisir un"
            onChange={setValueActivity}
            data={activityClean}
          />
          <Button type="submit" color="violet.6" radius="lg" fullWidth mt="xl">
            Ajouter
          </Button>
        </form>
      </Modal>
    )
  }


  const removeModal = () => {
    console.log(clickInfo)
    const userClean = allUser.map((u: any) => {
      return {
        value: u.id,
        label: u.name
      }
    })


    const activityClean = allActivity?.map((u: any) => {
      return {
        value: u.id,
        label: u.title
      }
    })

    const submit = () => {
      clickInfo.event.remove()
      deleteApi(clickInfo.event.id)
      onClose()
    };

    const edit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      clickInfo.event.remove();
      clickInfo.view.calendar.addEvent({
        id: clickInfo?.event.id,
        title: task,
        start: clickInfo?.event.startStr.substring(0, 11)
        + addZero(hour[0].getHours()) + ':' + addZero(hour[0].getMinutes()) + ':00',
        end: clickInfo?.event.startStr.substring(0, 11)
        + addZero(hour[1].getHours()) + ':' + addZero(hour[1].getMinutes()) + ':00',
        extendedProps: {
          educatorId: valueUser,
          activityTypeId: valueActivity,
        },
      })
      editApi({
        educatorId: valueUser,
        activityTypeId: valueActivity,
        report: task,
        beginDate: clickInfo?.event.startStr.substring(0, 11)
          + addZero(hour[0].getHours()) + ':' + addZero(hour[0].getMinutes()) + ':00.511Z',
        endDate: clickInfo?.event.startStr.substring(0, 11)
          + addZero(hour[1].getHours()) + ':' + addZero(hour[1].getMinutes()) + ':00.511Z',
      }, clickInfo.event.id)
      onClose()
    };
  
    const onClose = () => {
      setModalRemove(false)
      editClickInfo(clickInfo)
      setTask('')
      setValueUser(null)
      setValueActivity(null)
      setTask(clickInfo.event.title)
      setHour([now, then])
    }

    return (
      <Modal
        opened={modalRemove}
        onClose={() => onClose()}
        title="Détail de l'événement"
      >
        <>
        <form onSubmit={e => edit(e)}>
          <Textarea
            label="Rapport"
            name="title"
            placeholder="Mon Rapport"
            value={task}
            onChange={(event) => setTask(event.currentTarget.value)}
          />

          <TimeRangeInput
            label="Appointment time"
            value={hour}
            onChange={setHour}
          />
        <Select
          value={valueUser}
          label="L'éducateur en chef"
          placeholder="En choisir un"
          onChange={setValueUser}
          data={userClean}
        />
        <Select
          value={valueActivity}
          label="L'activité"
          placeholder="En choisir un"
          onChange={setValueActivity}
          data={activityClean}
        />
          <Button type="submit" color="violet.6" radius="lg" fullWidth mt="xl">
            Editer
          </Button>
        </form>
        <Button color="red.6" radius="lg" fullWidth mt="xl" onClick={submit}>
          Supprimer cet événement
        </Button>
        </>
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
        {allEvents && (
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

  const handleEventClick = (clickInfo: { event: any, view: any }) => {
    const userId = clickInfo?.event?.extendedProps?.educatorId
    const educator: any = allUser.filter((u: any) => u.id === userId)[0]
    const activityId = clickInfo?.event?.extendedProps?.activityTypeId
    const activity: any = allActivity.filter((u: any) => u.id === activityId)[0]
    setModalRemove(true)
    editClickInfo(clickInfo);
    setValueUser(educator?.id)
    setValueActivity(activity?.id)
    setTask(clickInfo.event.title)
    setHour([
      new Date(clickInfo?.event.startStr),
      new Date(clickInfo?.event.endStr)
    ])
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
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={false}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={!!weekendsVisible}
            initialEvents={() => getInitialEvents()}
            select={handleDateSelect}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
            eventsSet={handleEvents}
          // eventAdd={addApi()}
          /*
          eventChange={function(){}}
          eventRemove={function(){}}
          */
          />
        </StyleWrapper>

      </div>
    </div>
  )
}

const addApi = (params: any) => {
  return fetch(`${process.env.SERVER_API}/sessions/create`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + Cookie.get('token'),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json
    })
    .catch((error) => {
      console.log("error : " + error.message);
    });
};

const getApi = () => {
  return fetch(`${process.env.SERVER_API}/sessions`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + Cookie.get('token'),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json
    })
    .catch((error) => {
      console.log("error : " + error.message);
    });
};

const deleteApi = (id: any) => {
  return fetch(`${process.env.SERVER_API}/sessions/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + Cookie.get('token'),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json
    })
    .catch((error) => {
      console.log("error : " + error.message);
    });
};

const getApiUser = () => {
  return fetch(`${process.env.SERVER_API}/user`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + Cookie.get('token'),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json
    })
    .catch((error) => {
      console.log("error : " + error.message);
    });
};

const getApiActivity = () => {
  return fetch(`${process.env.SERVER_API}/activity-type`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + Cookie.get('token'),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json
    })
    .catch((error) => {
      console.log("error : " + error.message);
    });
};

const editApi = (params: any, id: any) => {
  return fetch(`${process.env.SERVER_API}/sessions/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + Cookie.get('token'),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log("error : " + error.message);
    });
};

export default MyCalendar;
