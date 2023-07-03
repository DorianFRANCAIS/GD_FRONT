'use client';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { addHours, format } from 'date-fns';
import { useEffect, useRef, useState } from "react";


export interface IEvent {
  id?: string, // Identifiant unique de l'événement (optionnel)
  title: string, // Titre ou texte de l'événement
  start: string, // Date et heure de début de l'événement
  end: string, // Date et heure de fin de l'événement
  allDay?: boolean, // Indique si l'événement dure toute la journée (optionnel)
  color?: string, // Couleur de fond et de border (optionnel)
  backgroundColor?: string, // Couleur de fond de l'événement (optionnel)
  borderColor?: string, // Couleur de la bordure de l'événement (optionnel)
  textColor?: string, // Couleur du texte de l'événement (optionnel)
  className?: string | string[], // Classe(s) CSS supplémentaire(s) à appliquer à l'événement (optionnel)
  editable?: boolean, // Indique si l'événement est éditable (optionnel)
  startEditable?: boolean, // Indique si la date et l'heure de début de l'événement sont éditables (optionnel)
  durationEditable?: boolean, // Indique si la durée de l'événement est éditable (optionnel)
  constraint?: any, // Contraintes qui limitent le positionnement de l'événement (optionnel)
  overlap?: boolean // Indique si l'événement peut se chevaucher avec d'autres événements (optionnel)
}

export default function AgendaPage() {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [events, setEvents] = useState<IEvent[]>()
  const [dateMeeting, setDateMeeting] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const eventTempo: IEvent[] = []
    eventTempo.push({
      title: `Test`,
      start: '2023-07-03T13:30:45.000Z',
      end: '2023-07-03T14:30:45.000Z',
      editable: false,
      color: `#C3C2DB`,
      textColor: `white`
    })
    setEvents(eventTempo)

  }, [])

  useEffect(() => {
    if (dateMeeting !== "" && startDate !== "" && endDate !== "") {

      if (events && events.length > 0) {
        if (events[events?.length - 1].color == "#37347A") {
          events?.pop()
        }
      }

      const eventTempo: IEvent[] = [
        ...(events ?? []), // Copie des événements existants
        {
          title: `Test titre`,
          start: `${dateMeeting}T${startDate}:00+02:00`,
          end: `${dateMeeting}T${endDate}:00+02:00`,
          color: "#37347A"
        },
      ];

      setEvents(eventTempo);
    }
  }, [dateMeeting, startDate, endDate])

  return (
    <div className='grid md:grid-cols-12 gap-4 wrapper'>
      <form className='md:col-span-3'>
        <div className='flex flex-col border-2 border-lightBlueColor rounded-3xl p-4 mb-5'>
          <label className='mt-3 font-bold'>Nouvelle session</label>
          <select className="bg-main rounded-lg p-2">
            <option>Choix de l'activité</option>
            <option>Session 1</option>
            <option>Session 2</option>
          </select>
        </div>
        <div className='border-2 border-mainColor rounded-3xl p-4 mb-5'>
          <div className='mt-3'>
            <label className='label mt-3 font-bold'>RDV</label>
            <div className='2xl:col-span-5 flex justify-between items-center gap-1 bg-lightBlueColor rounded-md px-2'>
              Le
              <input type="date" className='p-1 bg-transparent text-center input-custom' value={dateMeeting} onChange={(e) => setDateMeeting(e.target.value)} />
            </div>
            <div className='2xl:col-span-7 flex justify-between items-center gap-1 bg-lightBlueColor rounded-md px-2 mt-1'>
              de
              <input type="time" className='p-1 bg-transparent text-center input-custom' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              à
              <input type="time" className='p-1 bg-transparent text-center input-custom' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>
        </div>
        <div className='border-2 border-mainColor rounded-3xl p-4 mb-5 text-start'>
          <h3 className="text-mainColor text-base font-bold">Participants</h3>
        </div>
        <div className='mb-5 flex justify-center items-center gap-3'>
          <button type="submit" className='btn rounded-3xl w-full flex justify-between items-center'>Enregistrer</button>
        </div>
      </form >
      <div className='md:col-span-9 min-h-screen auto border-2 border-mainColor rounded-3xl p-4 mb-5'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={"timeGridWeek"}
          headerToolbar={{
            left: 'prev',
            center: 'timeGridDay,timeGridWeek,dayGridMonth',
            right: 'next',
          }}
          buttonText={{
            today: "Aujourd'hui",
            month: "Mois",
            week: "Semaine",
            day: "Jour"
          }}
          eventChange={(e) => {
            if (e.event.start && e.event.end) {
              setDateMeeting(format(new Date(e.event.start), 'yyyy-MM-dd'));
              setStartDate(format(new Date(e.event.start), "HH:mm"))
              setEndDate(format(new Date(e.event.end), "HH:mm"))
            }
          }}
          dateClick={(e) => {
            setDateMeeting(format(new Date(e.date), "yyyy-MM-dd"))
            setStartDate(format(new Date(e.date), "HH:mm"))
            setEndDate(format(addHours(e.date, 1), 'HH:mm'));
          }}
          events={events}
          locale="fr"
          editable={true}
          selectable={true}
          firstDay={1}
          allDaySlot={false}
          weekends={false}
          slotMinTime="08:00:00"
          slotMaxTime="20:00:00"
          ref={calendarRef}
        />
      </div>
    </div>
  )
}