import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { handleDogs } from "@/pages/api/dogs/dogsApi";
import handleEstablishments from "@/pages/api/establishments/establishmentsApi";

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


async function Dashboard() {
    const session = await getServerSession(authOptions);
    const establishments: IEstablishments[] = await handleEstablishments(session);
    const dogs: IDogs[] = await handleDogs(session,establishments[0]._id);

    return (
        <div className="grid grid-cols-2 justify-center items-start gap-x-12 my-4 w-full">
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
                        {dogs && dogs.map((dog, idx) => (
                            <div key={idx} className="flex flex-col justify-center items-center">
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
};

export default Dashboard;