"use client";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";

export interface IEstablishments {
    _id: string,
    owner: string,
    name: string,
    description: string,
    address: string,
    phoneNumber: string,
    emailAddress: string,
    employees: [
        string
    ],
    schedules: [any]
}

export interface IDogs {
    nationalId: string,
    name: string,
    imageUrl: string,
    gender: string,
    breed: string,
    birthDate: string,
    weight: number,
    height: number,
}


export default function Dashboard() {
    const { data: session, status } = useSession();
    const [establishments, setEstablishments] = useState<IEstablishments[]>([]);
    const [dogs, setDogs] = useState<IDogs[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (status === 'authenticated') {
                console.log("hello", session?.user.user._id)
                try {
                    const response = await fetch(`/api/establishments/establishmentsApi?ownerId=${session?.user.user._id}`, {
                        headers: {
                            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
                        },
                    });
                    const data = await response.json();
                    localStorage.setItem('establishments', JSON.stringify(data[0]._id));
                    console.log(data)
                    setEstablishments(data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData();
        console.log(establishments)
    }, [session, status]);

    useEffect(() => {
        const establishmentId = localStorage.getItem("establishments");
        let establishmentIdWithoutQuotes: string;
        if (establishmentId) {
            establishmentIdWithoutQuotes = establishmentId.replace(/"/g, "");
            console.log(establishmentIdWithoutQuotes)
        }


        const fetchDogs = async () => {
            if (status === 'authenticated') {
                try {
                    console.log("establishmentId", establishmentId)
                    const response = await fetch(`/api/dogs/dogsApi?establishmentId=${establishmentIdWithoutQuotes}`, {
                        headers: {
                            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
                        },
                    });
                    const data = await response.json();
                    console.log("dogs", data)
                    setDogs(data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchDogs();
    }, [status, establishments]);

    return (
        <div className="grid grid-cols-2 justify-center items-start gap-x-12 w-full">
            {/* <h1>Bienvenue {session?.user.user.firstname}</h1> */}
            <div className="wrapper">
                <h3 className="text-mainColor text-2xl font-bold">Session du jour</h3>
                <div className="flex flex-col gap-y-12 mt-9">
                    <div className="flex justify-between bg-greyColor rounded-twenty px-5 py-2" >
                        <img
                            src="/img/avatar.svg"
                            alt="Profile"
                            className="avatar rounded-full"
                        />
                        <div className="flex flex-col font-ws font-bold">
                            <p>Type : Checking annuel</p>
                            <p>ce Lundi 12 juillet 2023 à 14H30</p>
                            <p>Tarif : 120€</p>
                        </div>
                        <img
                            src="/img/avatar.svg"
                            alt="Profile"
                            className="avatar rounded-full"
                        />
                    </div>
                    <div className="flex justify-between bg-greyColor rounded-twenty px-5 py-2">
                        <img
                            src="/img/avatar.svg"
                            alt="Profile"
                            className="avatar rounded-full"
                        />
                        <div className="flex flex-col font-ws font-bold">
                            <p>Type : Checking annuel</p>
                            <p>ce Lundi 12 juillet 2023 à 14H30</p>
                            <p>Tarif : 120€</p>
                        </div>
                        <img
                            src="/img/avatar.svg"
                            alt="Profile"
                            className="avatar rounded-full"
                        />
                    </div>
                    <div className="flex justify-between bg-greyColor rounded-twenty px-5 py-2">
                        <img
                            src="/img/avatar.svg"
                            alt="Profile"
                            className="avatar rounded-full"
                        />
                        <div className="flex flex-col font-ws font-bold">
                            <p>Type : Checking annuel</p>
                            <p>ce Lundi 12 juillet 2023 à 14H30</p>
                            <p>Tarif : 120€</p>
                        </div>
                        <img
                            src="/img/avatar.svg"
                            alt="Profile"
                            className="avatar rounded-full"
                        />
                    </div>
                    <div className="flex justify-between bg-greyColor rounded-twenty px-5 py-2">
                        <img
                            src="/img/avatar.svg"
                            alt="Profile"
                            className="avatar rounded-full"
                        />
                        <div className="flex flex-col font-ws font-bold">
                            <p>Type : Checking annuel</p>
                            <p>ce Lundi 12 juillet 2023 à 14H30</p>
                            <p>Tarif : 120€</p>
                        </div>
                        <img
                            src="/img/avatar.svg"
                            alt="Profile"
                            className="avatar rounded-full"
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-y-8">
                <div className="wrapper">
                    <h3 className="text-mainColor text-2xl font-bold">Mes chiens</h3>
                    <div className="flex flex-grow items-center gap-x-2">
                        {dogs.map((dog, idx) => (
                            <div key={idx} className="flex flex-col">
                                <img
                                    src={dog?.imageUrl ? dog?.imageUrl : "/img/avatar.svg"}
                                    alt="Profile"
                                    className="avatar rounded-full"
                                />
                                <span className="text-xs font-bold">{dog.name}</span>
                            </div>
                        ))}
                    </div>


                </div>
                <div className="wrapper">
                    <h3 className="text-mainColor text-2xl font-bold">Mon équipe</h3>
                </div>
                <div className="wrapper">
                    <h3 className="text-mainColor text-2xl font-bold">Mes activités</h3>
                    <div className="flex flex-col gap-y-12 mt-9">
                        <div className="flex justify-between bg-greyColor rounded-twenty px-5 py-2" >
                            <img
                                src="/img/avatar.svg"
                                alt="Profile"
                                className="avatar rounded-full"
                            />
                            <div className="flex flex-col font-ws font-bold">
                                <p>Type : Checking annuel</p>
                                <p>ce Lundi 12 juillet 2023 à 14H30</p>
                                <p>Tarif : 120€</p>
                            </div>
                            <img
                                src="/img/avatar.svg"
                                alt="Profile"
                                className="avatar rounded-full"
                            />
                        </div>
                        <div className="flex justify-between bg-greyColor rounded-twenty px-5 py-2">
                            <img
                                src="/img/avatar.svg"
                                alt="Profile"
                                className="avatar rounded-full"
                            />
                            <div className="flex flex-col font-ws font-bold">
                                <p>Type : Checking annuel</p>
                                <p>ce Lundi 12 juillet 2023 à 14H30</p>
                                <p>Tarif : 120€</p>
                            </div>
                            <img
                                src="/img/avatar.svg"
                                alt="Profile"
                                className="avatar rounded-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}