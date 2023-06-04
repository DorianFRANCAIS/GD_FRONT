'use client';
import { axiosClient } from "@/utils/apiClient";
import { useEffect, useState } from "react";

export interface IEstablishments {
    address: string;
    emailAddress: string;
    employees: [object];
    name: string;
    owner: [object];
    phoneNumber: string;
    schedules: [object];
}

export default function EtablishmentPage() {
    const [estasblishments, setEstablishments] = useState<IEstablishments[]>([]);

    useEffect(() => {
        const fetchEstablishments = async () => {
            try {
                const response = await axiosClient.get('/establishments')
                if(response) {
                    setEstablishments(response.data)
                }
                return response
            } catch (error) {
                throw error;
            }
        }
        fetchEstablishments()

    }, [])
    return (
      <div className="bg-primary min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full mx-auto">
              <h1 className="text-4xl font-bold mb-8">Vos établissements</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                  {estasblishments && estasblishments.map((establishment,idx) => (
                    <div key={idx} className="bg-white rounded-lg shadow-lg px-6 py-4 w-full">
                        <h2 className="text-lg font-medium text-center text-gray-800">{establishment.name}</h2>
                        <p className="text-gray-500"></p>
                    </div>
                  ))}
              </div>
          </div>
      </div>
    )
}