'use client';

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { addHours, format } from "date-fns";
import { fr } from "date-fns/locale";
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { ISession } from "@/types/ISession";
import NewSessionModal from "@/components/modal/NewSessionModal";
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

function AgendaPage(props: {sessions: ISession[]}) {
  const { data: session, status } = useSession();
  const calendarRef = useRef<FullCalendar | null>(null);
  const [events, setEvents] = useState<IEvent[]>()
  const [dateMeeting, setDateMeeting] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('');
  const [isModalSessionOpen, setIsModalSessionOpen] = useState<boolean>(false);

  useEffect(() => {
    const eventTempo: IEvent[] = []
    props.sessions.map((session) => {
      eventTempo.push({
        title: `${session.activity.title}`,
        start: `${session.beginDate}`,
        end: `${session.endDate}`,
        editable: false,
        color: "#37347A",
        textColor: `white`
      })
    })
    setEvents(eventTempo)

  }, [])

  const openModalSession = (e: any) => {
    e.preventDefault()
    setIsModalSessionOpen(true)
  }
  return (
    <div className='grid grid-cols-2 gap-4'>
      {isModalSessionOpen && <NewSessionModal isModalSessionOpen={isModalSessionOpen} />}
      <div className='col-span-3 rounded-3xl p-4 mb-5 wrapper'>
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
          slotMaxTime="23:00:00"
          ref={calendarRef}
        />
      </div>
      <form className='col-span-1 flex-col'>
        <h2 className="text-white text-2xl">Vous souhaitez créer une nouvelle session ?</h2>
        <button className="btn p-4 mt-2" onClick={openModalSession}>Créer une nouvelle session</button>
        <div className="mt-12">
          <h5 className="text-white text-2xl">Sessions prévues :</h5>
        </div>
        {props.sessions && props.sessions.map((session,idx) => (
          <div key={idx} className='mt-2 bg-white flex justify-between items-center rounded-3xl p-4 mb-5'>
            <div className="flex w-full">
              <img
                src={session.activity.imageUrl}
                alt="Profile"
                className="avatar rounded-full"
              />
              <div className="ml-2 flex w-full items-center flex-col">
                <p>{session.activity.title}</p>
                <p className="text-greyBoldColor">{"Le " + format(new Date(session.beginDate),  "dd MMMM yyyy 'à' HH'h'mm", { locale: fr })}</p>
              </div>
            </div>
            <p className="flex">Voir plus</p>
          </div>
        ))}
      </form >
    </div>
  )
};

export default AgendaPage;