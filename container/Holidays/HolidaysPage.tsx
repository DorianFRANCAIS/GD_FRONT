'use client';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useEffect, useRef, useState } from "react";
import { IHolidays } from "@/types/IHolidays";
import { IEventHolidays } from "@/types/ICalendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import NewHolidaysModal from "@/components/modal/NewHolidaysModal";


function HolidaysPage(props: { session: any, holidays: IHolidays[] }) {
    const calendarRef = useRef<FullCalendar | null>(null);
    const [events, setEvents] = useState<IEventHolidays[]>()
    const [isModalHolidaysOpen, setIsModalHolidaysOpen] = useState<boolean>(false);
    const today = new Date();
    const isoDateString = today.toISOString();

    useEffect(() => {
        const eventTempo: IEventHolidays[] = []
        props.holidays.map((session) => {
            eventTempo.push({
                title: `${session.employee.firstname}`,
                start: `${session.beginDate}`,
                end: `${session.endDate}`,
                _id: `${session._id}`,
                status: session.status,
                establishment: session.establishment,
                employee: session.employee,
                isApproved: session.isApproved,
                beginDate: session.beginDate,
                endDate: session.endDate,
                editable: false,
                color: session.status === "Pending" ? "red" : "#37347A",
                textColor: `white`
            })
        })
        setEvents(eventTempo)
        console.log(events)
    }, [])


    const closeModalHolidays = () => {
        setIsModalHolidaysOpen(false);
    };
    return (
        <div className="grid grid-cols-6 gap-4">
            {isModalHolidaysOpen && <NewHolidaysModal isModalHolidaysOpen={isModalHolidaysOpen} closeModalHolidays={closeModalHolidays} session={props.session} />}
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
                    locale="fr"
                    events={events}
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
                <button className="btn w-full p-4 mt-2" onClick={() => setIsModalHolidaysOpen(true)}>Faire une demande de congés</button>
                <div className="mt-12">
                    <h5 className="text-white text-2xl">Congés prévus :</h5>
                    <div className='mt-2 bg-white flex justify-between items-center rounded-twenty p-4 mb-5'>
                        <div className="ml-2 flex flex-col">
                            <span className="bg-orangeColor text-white p-1 text-center rounded-xl" >En attente d'acceptation</span>
                            <p>Demande de congés de Martin Petit</p>
                            <p className="text-mainColor">Du 01/12/2023 au 10/12/2023</p>
                        </div>
                        {props.session && props.session.user.user.role === "Administrator" &&
                            <button className="btn p-2">Approuver</button>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
};

export default HolidaysPage;