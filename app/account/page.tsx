"use client";
import { format } from "date-fns";
import { fr } from 'date-fns/locale';
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";

export interface IUser {
    _id: string;
    lastname: string;
    firstname: string;
    avatarUrl: string;
    role: string;
    emailAddress: string;
    phoneNumber: string;
    birthDate: string;
    activities: [];
    stripeId: string;
    registeredAt: string;
    lastConnectionAt: string;
    __v: 0
}

export default function Account() {
    const { data: session, status } = useSession();
    const [userInformations, setUserInformations] = useState<IUser | null>(null);
    console.log(session?.user.user._id)

    useEffect(() => {
        const fetchData = async () => {
            if (status === 'authenticated') {
                console.log("hello")
                try {
                    const response = await fetch(`/api/users/getUserInformations?userId=${session?.user.user._id}`, {
                        headers: {
                            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
                        },
                    });
                    const data = await response.json();
                    console.log(data)
                    setUserInformations(data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData();
    }, [session, status]);

    const calculateAge = (dateOfBirth: any) => {
        const birthDate = new Date(dateOfBirth);
        const currentDate = new Date();

        let age = currentDate.getFullYear() - birthDate.getFullYear();

        // Vérifie si l'anniversaire est déjà passé dans l'année actuelle
        const birthMonth = birthDate.getMonth();
        const currentMonth = currentDate.getMonth();
        const birthDay = birthDate.getDate();
        const currentDay = currentDate.getDate();

        if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
            age--;
        }

        return age;
    }

    const formatDateToFrench = (dateString: any) => {
        const formattedDate = format(new Date(dateString), 'dd MMMM yyyy', { locale: fr });
        return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1); // Mettre la première lettre en majuscule
    }

    return (
        <div className="flex justify-center items-start gap-x-12 w-full">
            <div className="bg-greyColor w-full p-6 rounded-md ">
                <div className="flex gap-x-8 w-full">
                    <img
                        src={userInformations?.avatarUrl}
                        alt="Profile"
                        className="h-36 w-36 rounded-full"
                    />
                    <div className="flex flex-col w-full">
                        <div>
                            <label className="font-bold">Prénom / Nom</label>
                            <div className="bg-white rounded-twenty p-4 mt-5 w-full">
                                <p className="font-bold">{userInformations?.firstname} {userInformations?.lastname}</p>
                            </div>
                        </div>
                        <div>
                            <label className="font-bold">Âge</label>
                            <div className="bg-white rounded-twenty p-4 mt-5 w-full">
                                <p className="font-bold">{calculateAge(userInformations?.birthDate)} ans</p>
                            </div>
                        </div>
                        <div>
                            <label className="font-bold">Adresse mail</label>
                            <div className="bg-white rounded-twenty p-4 mt-5 w-full">
                                <p className="font-bold">{userInformations?.emailAddress}</p>
                            </div>
                        </div>
                        <div>
                            <label className="font-bold">Propriétaire de :</label>
                            <div className="flex bg-white rounded-twenty p-4 mt-5 w-full">
                                <div className="flex flex-col items-center">
                                    <img
                                        src={session?.user.user.avatarUrl}
                                        alt="Profile"
                                        className="avatar rounded-full"
                                    />
                                    <span className="text-xs font-bold">Yuki</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div>
                            <label className="font-bold">Numéro de téléphone</label>
                            <div className="bg-white rounded-twenty p-4 mt-5 w-1/2">
                                <p className="font-bold">{userInformations?.phoneNumber}</p>
                            </div>
                        </div>
                        <div>
                            <label className="font-bold">Date de naissance</label>
                            <div className="bg-white rounded-twenty p-4 mt-5 w-1/2">
                                <p className="font-bold">{formatDateToFrench(userInformations?.birthDate)}</p>
                            </div>
                        </div>
                        <div className="flex flex-col flex-1">
                            <label className="font-bold">Activités</label>
                            <div className="flex flex-grow bg-white rounded-twenty p-4 mt-5 w-full">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}