"use client";
import { useSession } from "next-auth/react"
import { useEffect } from "react";

export default function Dashboard() {
    const { data: session } = useSession();
    console.log(session)

    useEffect(() => {

    }, [])

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