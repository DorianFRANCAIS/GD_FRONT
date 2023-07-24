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
import { IUser } from "@/types/IUser";
import { IActivity } from "@/types/IActivity";
import { IEstablishments } from "@/types/IEstablishments";

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

function AgendaPage(props: { sessions: ISession[], educators: IUser[], activities: IActivity[], establishments: IEstablishments[] }) {
  const { data: session, status } = useSession();
  const calendarRef = useRef<FullCalendar | null>(null);
  const [events, setEvents] = useState<IEvent[]>()
  const [isModalSessionOpen, setIsModalSessionOpen] = useState<boolean>(false);
  const today = new Date();
  const isoDateString = today.toISOString();


  useEffect(() => {
    console.log(props.activities)
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

  const closeModalSession = () => {
    setIsModalSessionOpen(false);
  };

  return (
    <div className={`grid grid-cols-2 gap-4`}>
      {isModalSessionOpen && <NewSessionModal isModalSessionOpen={isModalSessionOpen} closeModalSession={closeModalSession} educators={props.educators} activities={props.activities} establishments={props.establishments} />}
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
      <div className='col-span-1 flex-col'>
        <h2 className="text-white text-2xl">Vous souhaitez créer une nouvelle session ?</h2>
        <button className="btn w-full p-4 mt-2" onClick={openModalSession}>Créer une nouvelle session</button>
        <div className="mt-12">
          <h5 className="text-white text-2xl">Sessions prévues :</h5>
        </div>
        {props.sessions && props.sessions.map((session, idx) => (
          isoDateString < session.beginDate &&
          <div key={idx} className='mt-2 bg-white flex justify-between items-center rounded-twenty p-4 mb-5'>
            <img
              src={session.activity.imageUrl}
              alt="Profile"
              className="avatar rounded-full"
            />
            <div className="ml-2 flex items-center flex-col">
              <p>{session.activity.title}</p>
              <p className="text-greyBoldColor">{"Le " + format(new Date(session.beginDate), "dd MMMM yyyy 'à' HH'h'mm", { locale: fr })}</p>
            </div>
            <p className="">Voir plus</p>
          </div>
        ))}
      </div >
    </div>
  )
};

export default AgendaPage;