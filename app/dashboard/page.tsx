import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { handleDogs } from "@/pages/api/dogs/dogsApi";
import handleEstablishments from "@/pages/api/establishments/establishmentsApi";
import { IEstablishments } from "@/types/IEstablishments";
import { IDogs } from "@/types/IDogs";
import { GetSessions } from "@/pages/api/sessions/sessionsApi";
import { ISession } from "@/types/ISession";
import { GetAllStaff } from "@/pages/api/users/getUserInformations";
import { IUser } from "@/types/IUser";
import { format } from "date-fns";
import { fr } from "date-fns/locale";



async function Dashboard() {
    const session = await getServerSession(authOptions);
    const establishments: IEstablishments[] = await handleEstablishments(session);
    let dogs: IDogs[] = [];
    let sessions: ISession[] = [];
    let usersStaff: IUser[] = [];
    if(establishments.length > 0) {
        dogs = await handleDogs(session,establishments[0]._id);
        sessions = await GetSessions(session, { establishmentId: establishments[0]._id, begin: new Date().toISOString() });
        usersStaff = await GetAllStaff(session,establishments[0]._id);
    }

    return (
        <div className="grid grid-cols-2 justify-center items-start gap-x-12 my-4 w-full">
            <div className="wrapper">
                <h3 className="text-mainColor text-2xl font-bold">Session du jour</h3>
                <div className="flex flex-col gap-y-12 mt-9">
                    {sessions.length > 0 ? (
                        sessions.map((session, idx) => (
                      <div key={idx} className="flex justify-between bg-greyColor rounded-twenty px-5 py-2" >
                          <img
                            src={session.activity.imageUrl}
                            alt="Profile"
                            className="avatar rounded-full"
                          />
                          <div className="flex flex-col font-ws font-bold">
                              <p>Type : {session.activity.title}</p>
                              <p>{"Le " + format(new Date(session.beginDate),  "dd MMMM yyyy 'à' HH'h'mm", { locale: fr })}</p>
                              <p>Tarif : {session.activity.price}€</p>
                          </div>
                          <img
                            src={session.activity.imageUrl}
                            alt="Profile"
                            className="avatar rounded-full"
                          />
                      </div>
                        ))
                        ) : ( <div>
                            <p>Vous n&apos;avez aucune session aujourd&apos;hui.</p>
                      </div>
                    )}
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
                    <div className="flex flex-grow items-center gap-x-2">
                    {usersStaff && usersStaff.map((staff, idx) => (
                      <div key={idx} className="flex flex-col justify-center items-center">
                          <img
                            src={staff?.avatarUrl ? staff?.avatarUrl : "/img/avatar.svg"}
                            alt="Profile"
                            className="avatar rounded-full"
                          />
                          <span className="text-xs font-bold">{staff.firstname}</span>
                          <span className="text-xs font-bold">{staff.role}</span>
                      </div>
                    ))}
                    </div>
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