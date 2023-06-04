'use client';

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
export default function AgendaPage() {
  const events = [
    { title: 'Meeting', start: new Date() }
  ]
  return (
    <div className="bg-primary min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={false}
        events={events}
      />
    </div>
  )
}