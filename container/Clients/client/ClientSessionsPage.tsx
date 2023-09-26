'use client';

import { ISession } from "@/types/ISession";

function ClientSessionsPage(props: { clientSessions: ISession[] }) {

    return (
        <div className="space-y-6">
            {props.clientSessions.length > 0 ?
                props.clientSessions.map((session, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-medium text-mainColor mb-2">{session.title}</h2>
                        <p className="text-gray-600">Date: {session.beginDate}</p>
                        <p className="text-gray-600">Durée: </p>
                        <p className="mt-2">
                            {session.report ? session.report : "Aucun rapport."}
                        </p>
                    </div>
                ))
                :
                <p className="font-bold text-mainColor">Aucun historique de sessions.</p>
            }
        </div>
    )
};

export default ClientSessionsPage;