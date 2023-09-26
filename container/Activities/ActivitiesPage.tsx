'use client';
import NewActivityModal from "@/components/modal/NewActivityModal";
import { IActivity } from "@/types/IActivity";
import { IEstablishmentsSelect } from "@/types/IEstablishments";
import { useSession } from "next-auth/react";
import { useState } from "react";


function ActivitiesPage(props: { activities: IActivity[], establishments: IEstablishmentsSelect[] }) {
    const [isModalAcitivityOpen, setIsModalActivityOpen] = useState<boolean>(false);
    const { data: session } = useSession();

    const openModalActivity = (e: any) => {
        e.preventDefault()
        setIsModalActivityOpen(true)
    }

    const closeModalActivity = () => {
        setIsModalActivityOpen(false);
    };
    return (
        <div className="flex justify-center items-start gap-x-12 w-full">
            {isModalAcitivityOpen && <NewActivityModal isModalAcitivityOpen={isModalAcitivityOpen} closeModalActivity={closeModalActivity} establishments={props.establishments} />}
            <div className="bg-greyColor w-full p-6 rounded-md ">
                <div className="flex justify-between items-center">
                    <h3 className="text-mainColor text-3xl font-bold mb-2">Activitées de l'établissement</h3>
                    {session?.user.user.role === 'Manager' &&
                        <button className="btn text-white px-4 py-2" onClick={openModalActivity}>Créer une nouvelle activitée</button>
                    }
                </div>
                <div className="grid grid-cols-6 gap-2 w-full">
                    {props.activities && props.activities.map((activity, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow-md p-4 max-w-md">
                            <img
                                src={activity.imageUrl}
                                alt="activity"
                                className="h-32 w-full"
                            />
                            <p className="text-xl text-mainColor font-bold mb-2">{activity.title}</p>
                            <p className="text-xs text-mainColor font-bold">Description : {activity.description}</p>
                            <p className="text-xs text-mainColor font-bold">Durée : {activity.duration}min</p>
                            <p className="text-xs text-mainColor font-bold">Prix : {activity.price}€</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default ActivitiesPage;