'use client';

function ClientSessionsPage(props: {}) {
    return (
        <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-medium text-mainColor mb-2">Session d'Entraînement en Agility</h2>
                <p className="text-gray-600">Date: 10 août 2023</p>
                <p className="text-gray-600">Durée: 1 heure</p>
                <p className="mt-2">
                    Les chiens ont été formés à divers obstacles d'agilité, y compris des sauts, des tunnels et des slaloms.
                </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-medium text-mainColor mb-2">Promenade en Groupe</h2>
                <p className="text-gray-600">Date: 15 août 2023</p>
                <p className="text-gray-600">Durée: 1 heure</p>
                <p className="mt-2">
                    Les chiens ont profité d'une agréable promenade en groupe dans le parc local, favorisant la socialisation et l'exercice.
                </p>
            </div>
        </div>
    )
};

export default ClientSessionsPage;