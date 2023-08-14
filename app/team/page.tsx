import { getActivitiesById } from "@/pages/api/activities/activitiesApi";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import handleEstablishments from "@/pages/api/establishments/establishmentsApi";
import { GetAllStaff } from "@/pages/api/users/route";
import { IActivity } from "@/types/IActivity";
import { IEstablishments } from "@/types/IEstablishments";
import { IUser } from "@/types/IUser";
import { getServerSession } from "next-auth";

async function Team() {
    const session = await getServerSession(authOptions);
    let staffList: IUser[] = [];
    let activitiesStaff:IActivity[] = [];
    const establishments: IEstablishments[] = await handleEstablishments(session);
    if (establishments.length > 0) {
        staffList = await GetAllStaff(session, establishments[0]._id);
        if(staffList.length > 0) {
            for(let i=0;i > staffList.length;i++) {
                activitiesStaff = await getActivitiesById(session,staffList[i].activities)
            }
            console.log("activitiesStaff",activitiesStaff)
        }
    }

    return (
        <div className="flex justify-center items-start gap-x-12 w-full">
            <div className="bg-greyColor w-full p-6 rounded-md ">
                <h1 className="text-3xl text-mainColor font-bold mb-6">Mon équipe</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {staffList && staffList.map((staff, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow-lg p-4">
                            <img
                                src={staff.avatarUrl ? staff.avatarUrl : "/img/avatar.svg"}
                                alt={`${staff.firstname} ${staff.lastname}`}
                                className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
                            />
                            <h2 className="text-xl font-bold mb-2">
                                {staff.firstname} {staff.lastname}
                            </h2>
                            <p className="text-gray-500 mb-2">{staff.role}</p>
                            <div className="mb-2">
                                <p className="font-bold">Etablissements :</p>
                                <ul className="list-disc list-inside">
                                    {staff.establishments.map((establishment, index) => (
                                        <li key={index}>{establishment._id}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mb-2">
                                <p className="font-bold">Activités :</p>
                                <ul className="list-disc list-inside">
                                    {staff.activities.map((activity, index) => (
                                        <li key={index}>{activity}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Team;