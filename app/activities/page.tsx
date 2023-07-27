import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { handleDogs } from "@/pages/api/dogs/dogsApi";
import { IEstablishments } from "../establishments/page";
import handleEstablishments from "@/pages/api/establishments/establishmentsApi";
import { getActivities } from "@/pages/api/activities/activitiesApi";
import { IActivity } from "@/types/IActivity";



async function Activities() {
    const session = await getServerSession(authOptions);
    const establishments: IEstablishments[] = await handleEstablishments(session);
    let activities: IActivity[] = [];
    if (establishments.length > 0) {
        activities = await getActivities(session, establishments[0]._id);
    }
    return (
        <div className="flex justify-center items-start gap-x-12 w-full">
            <div className="bg-greyColor w-full p-6 rounded-md ">
                <div className="flex justify-between items-center">
                    <h3 className="text-mainColor text-3xl font-bold mb-2">Activitées de l'établissement</h3>
                    <button className="btn text-white px-4 py-2">Créer une nouvelle activitées</button>
                </div>
                <div className="grid grid-cols-4 gap-x-8 w-full">
                    {activities && activities.map((activity, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow-md p-4 max-w-md">
                            <img
                                src={activity.imageUrl}
                                alt="activity"
                                className="h-40 w-full"
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

export default Activities;