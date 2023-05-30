'use client';
import { axiosClient } from "@/utils/apiClient";
import { useEffect } from "react"

export default function EtablishmentPage() {
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
        <div>
            <h2>Hello établissements</h2>
        </div>
    )
}