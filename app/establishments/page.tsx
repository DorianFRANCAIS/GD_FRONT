'use client';
import { axiosClient } from "@/utils/apiClient";
import { useEffect } from "react"

export default function EtablishmentPage() {
    const establishments = [
        { id: 1, name: 'Dog Paradise', location: 'City A' },
        { id: 2, name: 'Paws Inn', location: 'City B' },
        { id: 3, name: 'Canine Haven', location: 'City C' },
        { id: 4, name: 'Bark Avenue', location: 'City D' },
        { id: 5, name: 'Woof World', location: 'City E' },
        { id: 6, name: 'Puppy Palace', location: 'City F' },
        { id: 7, name: 'Tail Waggers', location: 'City G' },
        { id: 8, name: 'Paw Prints', location: 'City H' },
        { id: 9, name: 'Doggie Delight', location: 'City I' },
    ];
    useEffect(() => {
        const fetchEstablishments = async () => {
            try {
                const response = await axiosClient.get('/establishments')
                return response
            } catch (error) {
                throw error;
            }
        }
        fetchEstablishments()
    }, [])
    return (
        <div className="bg-primary w-full min-h-screen py-12 px-4 sm:px-6 lg:px-8">

            <div className="w-full mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8">Dog Establishments</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                    {establishments.map((establishment) => (
                        <div key={establishment.id} className="bg-white rounded-lg shadow-lg px-6 py-4">
                            <h2 className="text-lg font-medium text-gray-800">{establishment.name}</h2>
                            <p className="text-gray-500">{establishment.location}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}