'use client';

import NewEmployeeModal from "@/components/modal/NewEmployeeModal";
import { IActivity } from "@/types/IActivity";
import { IEstablishments } from "@/types/IEstablishments";
import { IUser } from "@/types/IUser";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


function TeamPage(props: { employees: IUser[], activityTab: IActivity[], establishments: IEstablishments[] }) {
    const [isModalEmployeeOpen, setIsModalEmployeeOpen] = useState<boolean>(false);
    const { data: session } = useSession();

    const openModalEmployee = (e: any) => {
        e.preventDefault()
        setIsModalEmployeeOpen(true)
    }

    const closeModalEmployee = () => {
        setIsModalEmployeeOpen(false);
    };

    return (
        <div className="flex justify-center items-start gap-x-12 w-full">
            {isModalEmployeeOpen && <NewEmployeeModal isModalEmployeeOpen={isModalEmployeeOpen} closeModalEmployee={closeModalEmployee} establishments={props.establishments} />}
            <div className="bg-greyColor w-full p-6 rounded-md ">
                <div className="flex justify-between mb-2">
                    <h1 className="text-3xl text-mainColor font-bold mb-6">Mon équipe</h1>
                    {session && session.user.user.role === "Administrator" &&
                        <button onClick={openModalEmployee} className="btn text-white px-4 py-2" type="button">
                            Ajouter un éducateur
                        </button>
                    }
                </div>
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
                            <p className="text-gray-500 mb-2">{employee.role === "Educator" ? "Educateur" : "Administrateur"}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default TeamPage;