'use client';

import { ISession } from "@/types/ISession";

function ClientSessionsPage(props: { clientSessions: ISession[] }) {
    return (
        <div className="space-y-6">
            {props.clientSessions.length > 0 ?
                props.clientSessions.map((session, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-medium text-mainColor mb-2">Session d'Entraînement en Agility</h2>
                        <p className="text-gray-600">Date: 10 août 2023</p>
                        <p className="text-gray-600">Durée: 1 heure</p>
                        <p className="mt-2">
                            Les chiens ont été formés à divers obstacles d'agilité, y compris des sauts, des tunnels et des slaloms.
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