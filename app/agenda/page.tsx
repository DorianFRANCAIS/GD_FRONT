'use client';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { addHours, format } from 'date-fns';
import React, { useEffect, useRef, useState } from "react";


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
    <div className='grid md:grid-cols-12 gap-4'>
      <div className='md:col-span-8 rounded-3xl p-4 mb-5 wrapper'>
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
          slotMaxTime="19:00:00"
          ref={calendarRef}
        />
      </div>
      <form className='md:col-span-4 flex-col'>
        <h2 className="text-white text-2xl">Vous souhaitez créer une nouvelle session ?</h2>
        <button className="btn p-4 mt-2">Créer une nouvelle session</button>
        <div className="mt-12">
          <h5 className="text-white text-2xl">Sessions prévues :</h5>
        </div>
        <div className='mt-2 bg-white flex justify-between items-center rounded-3xl p-4 mb-5'>
          <div className="flex">
            <img
              src="/img/avatar.svg"
              alt="Profile"
              className="avatar rounded-full"
            />
            <div className="ml-2 flex flex-col">
              <p>Dressage</p>
              <p className="text-greyBoldColor">26/06/2023 à 13:00</p>
            </div>
          </div>
          <p>Voir plus</p>
        </div>
        <div className='mt-2 bg-white flex justify-between items-center rounded-3xl p-4 mb-5'>
          <div className="flex">
            <img
              src="/img/avatar.svg"
              alt="Profile"
              className="avatar rounded-full"
            />
            <div className="ml-2 flex flex-col">
              <p>Dressage</p>
              <p className="text-greyBoldColor">26/06/2023 à 13:00</p>
            </div>
          </div>
          <p>Voir plus</p>
        </div>
        <div className='mt-2 bg-white flex justify-between items-center rounded-3xl p-4 mb-5'>
          <div className="flex">
            <img
              src="/img/avatar.svg"
              alt="Profile"
              className="avatar rounded-full"
            />
            <div className="ml-2 flex flex-col">
              <p>Dressage</p>
              <p className="text-greyBoldColor">26/06/2023 à 13:00</p>
            </div>
          </div>
          <p>Voir plus</p>
        </div>
      </form >
    </div>
  )
}