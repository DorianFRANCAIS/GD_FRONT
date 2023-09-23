'use client';

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { IPutSession, ISession } from "@/types/ISession";
import NewSessionModal from "@/components/modal/NewSessionModal";
import { IUser } from "@/types/IUser";
import { IActivity } from "@/types/IActivity";
import { IEstablishments } from "@/types/IEstablishments";
import SessionInfosModal from "@/components/modal/SessionInfosModal";
import { IEventSession } from "@/types/ICalendar";
import { useRouter } from 'next/navigation'

async function UpdateSessionStatus(userSession: any, sessionId: string, status: string) {
  const response = await fetch(`/api/sessions/${sessionId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${userSession?.user.tokens.accessToken}`,
    },
    body: JSON.stringify(status),
  });
  return await response.json();
}



function AgendaPage(props: { sessions: ISession[], educators: IUser[], activities: IActivity[], establishments: IEstablishments[] }) {
  const { data: userSession } = useSession();
  const router = useRouter();
  const calendarRef = useRef<FullCalendar | null>(null);
  const [events, setEvents] = useState<IEventSession[]>()
  const [isModalSessionOpen, setIsModalSessionOpen] = useState<boolean>(false);
  const [isModalInfosSessionOpen, setIsModalInfosSessionOpen] = useState<boolean>(false);
  const [selectedSession, setSelectedSession] = useState<IEventSession | undefined>();
  const today = new Date();
  const isoDateString = today.toISOString();

  useEffect(() => {
    const eventTempo: IEventSession[] = []
    props.sessions.map((session) => {
      eventTempo.push({
        title: `${session.activity.title}`,
        start: `${session.beginDate}`,
        end: `${session.endDate}`,
        _id: `${session._id}`,
        educator: session.educator,
        status: session.status,
        activity: session.activity,
        establishment: session.establishment,
        maximumCapacity: session.maximumCapacity,
        report: session.report,
        beginDate: session.beginDate,
        endDate: session.endDate,
        editable: false,
        color: session.status === "Pending" ? "#37347A" : (session.status === "Confirmed" ? "green" : "red"),
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


  const closeModalInfosSession = () => {
    setIsModalInfosSessionOpen(false);
  };

  const displaySessions = (infos: any) => {
    setSelectedSession(infos.event._def.extendedProps)
    setIsModalInfosSessionOpen(true)
  }

  const ApproveSession = async (sessionId: string) => {
    const status: string = "Confirmed";

    await UpdateSessionStatus(userSession, sessionId, status)
    router.refresh()
  }


  return (
    <div className="grid grid-cols-6 gap-4">
      {isModalSessionOpen && <NewSessionModal isModalSessionOpen={isModalSessionOpen} closeModalSession={closeModalSession} educators={props.educators} activities={props.activities} establishments={props.establishments} />}
      <SessionInfosModal isModalInfosSessionOpen={isModalInfosSessionOpen} closeModalInfosSession={closeModalInfosSession} selectedSession={selectedSession} />
      <div className='col-span-4 rounded-3xl p-4 mb-5 wrapper'>
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
          eventClick={displaySessions}
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
      <div className='col-span-2 flex-col'>
      {userSession?.user.user.role !== 'Client' &&
      <>
        <h2 className="text-white text-2xl">Vous souhaitez créer une nouvelle session ?</h2>
        <button className="btn w-full p-4 mt-2" onClick={openModalSession}>Créer une nouvelle session</button>
      </>
      }
        <div className="mt-12">
          <h5 className="text-white text-2xl">Sessions prévues :</h5>
        </div>
        {props.sessions && props.sessions.map((session, idx) => (
          isoDateString <= session.beginDate && session.status === 'Pending' ?
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
            {userSession && userSession.user.user.role === "Manager" && session.status === "Pending" ?
              <button className="btn p-2" onClick={() => ApproveSession(session._id)}>Approuver</button>
              :
              <p className="text-green-500">Session approuvée</p>
            }
          </div>
          :
          <p className="text-white">Aucune session de prévue.</p>
        ))}
      </div>
    </div>
  )
};

export default AgendaPage;