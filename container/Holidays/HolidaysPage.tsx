'use client';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { use, useEffect, useRef, useState } from "react";
import { IHolidays, IPutHolidays } from "@/types/IHolidays";
import { IEventHolidays } from "@/types/ICalendar";
import NewHolidaysModal from "@/components/modal/NewHolidaysModal";
import { useSession } from "next-auth/react";
import { IEstablishments } from "@/types/IEstablishments";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

async function UpdateHolidayStatus(session: any, holidayId: string, newHolidayValue: IPutHolidays) {
    const response = await fetch(process.env.LOCAL_API + `/api/holidays/${holidayId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
        },
        body: JSON.stringify(newHolidayValue),
    });
    return await response.json();
}


function HolidaysPage(props: { session: any, holidays: IHolidays[], establishments: IEstablishments[] }) {
    const calendarRef = useRef<FullCalendar | null>(null);
    const [events, setEvents] = useState<IEventHolidays[]>()
    const [isModalHolidaysOpen, setIsModalHolidaysOpen] = useState<boolean>(false);
    const today = new Date();
    const isoDateString = today.toISOString();
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        const eventTempo: IEventHolidays[] = []
        props.holidays.map((holiday) => {
            eventTempo.push({
                title: `${holiday.employee.firstname}`,
                start: `${holiday.beginDate}`,
                end: `${holiday.endDate}`,
                _id: `${holiday._id}`,
                status: holiday.status,
                establishment: holiday.establishment,
                employee: holiday.employee,
                isApproved: holiday.isApproved,
                beginDate: holiday.beginDate,
                endDate: holiday.endDate,
                editable: false,
                color: holiday.status === "Pending" ? "red" : "#37347A",
                textColor: `white`
            })
        })
        setEvents(eventTempo)
    }, [])

    const ApproveHoliday = async (holidayId: string) => {
        const holiday: IPutHolidays = {
            status: "Approved",
            isApproved: true,
        }
        await UpdateHolidayStatus(session, holidayId, holiday)
        router.refresh()
    }

    const closeModalHolidays = () => {
        setIsModalHolidaysOpen(false);
    };
    return (
        <div className="grid grid-cols-6 gap-4">
            {isModalHolidaysOpen && <NewHolidaysModal isModalHolidaysOpen={isModalHolidaysOpen} closeModalHolidays={closeModalHolidays} session={props.session} establishments={props.establishments} />}
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
                    <h5 className="text-white text-2xl font-bold">Congés prévus :</h5>
                    {props.holidays.length > 0 ?
                        props.holidays.map((holiday, idx) => (
                            <div key={idx} className='mt-2 bg-white flex justify-between items-center rounded-twenty p-4 mb-5'>
                                <div className="ml-2 flex flex-col">
                                    <span className={`${holiday.isApproved === true ? "bg-green-500" : "bg-orangeColor"} text-white p-1 text-center rounded-xl`} >{holiday.status === "Pending" ? "En attente" : "Approuvé"}</span>
                                    <p>{holiday.employee.firstname} {holiday.employee.lastname}</p>
                                    <p className="text-mainColor">Du {format(new Date(holiday.beginDate), 'dd/MM/yyyy')} au {format(new Date(holiday.endDate), 'dd/MM/yyyy')}</p>
                                </div>
                                {props.session && props.session.user.user.role === "Manager" && holiday.isApproved === false ?
                                    <button className="btn p-2" onClick={() => ApproveHoliday(holiday._id)}>Approuver</button>
                                    :
                                    <></>
                                }
                            </div>
                        ))
                        :
                        <p className="text-white">Aucune demande de congés.</p>
                    }
                </div>
            </div>
        </div >
    )
};

export default HolidaysPage;