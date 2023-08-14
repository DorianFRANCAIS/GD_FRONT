'use client';

import { IActivity } from "@/types/IActivity";
import { IUser } from "@/types/IUser";
import { useEffect } from "react";


function TeamPage(props: { employees: IUser[], activityTab: IActivity[] }) {
    useEffect(() => {
        console.log(props.activityTab)
    }, []);
    return (
        <div className="flex justify-center items-start gap-x-12 w-full">
            <div className="bg-greyColor w-full p-6 rounded-md ">
                <h1 className="text-3xl text-mainColor font-bold mb-6">Mon équipe</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {props.employees && props.employees.map((employee, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow-lg p-4">
                            <img
                                src={employee.avatarUrl ? employee.avatarUrl : "/img/avatar.svg"}
                                alt={`${employee.firstname} ${employee.lastname}`}
                                className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
                            />
                            <h2 className="text-xl font-bold mb-2">
                                {employee.firstname} {employee.lastname}
                            </h2>
                            <p className="text-gray-500 mb-2">{employee.role}</p>
                            <div className="mb-2">
                                <p className="font-bold">Etablissements :</p>
                                <ul className="list-disc list-inside">
                                    {employee.establishments.map((establishment, index) => (
                                        <li key={index}>{establishment._id}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mb-2">
                                <p className="font-bold">Activités :</p>
                                <ul className="list-disc list-inside">
                                    {employee && props.activityTab.map((activity, index) => (
                                        <li key={index}>{activity.title}</li>
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

export default TeamPage;