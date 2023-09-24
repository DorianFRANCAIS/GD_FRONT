import { getServerSession } from "next-auth";
import { IEstablishments } from "@/types/IEstablishments";
import { IDogs } from "@/types/IDogs";
import { IDailySession } from "@/types/ISession";
import { IUser } from "@/types/IUser";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";
import { IActivity } from "@/types/IActivity";
import { options } from "../api/auth/[...nextauth]/options";

let establishmentIdWithoutQuotes: string;

async function GetDogs(session: any, establishmentId: string) {
    let url = process.env.SERVER_API + `/dogs`;
    if (establishmentId && session.user.user.role != "Client") {
        establishmentIdWithoutQuotes = establishmentId.replace(/"/g, "");
        url += `?establishmentId=${establishmentIdWithoutQuotes}`;
    }
    if (session.user.user.role === 'Client') {
        url += `?ownerId=${session.user.user._id}`;
    }
    console.log(url)
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
        },
    });
    return await response.json();
};

async function DailySessions(session: any, establishmentId: string, date: string) {
    const response = await fetch(process.env.SERVER_API + `/sessions/daily?establishmentId=${establishmentId}&date=${date}`, {
        headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
        }
    });

    const data = response.json();
    return data;
};

async function GetEstablishments(session: any) {
    let url: string = '';

    if (session.user.user.role === "Manager") {
        url = process.env.SERVER_API + `/establishments?ownerId=${session.user.user._id}`
    } else {
        url = process.env.SERVER_API + `/establishments?clientId=${session.user.user._id}`
    }
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${session.user.tokens.accessToken}`,
        },
    });
    return response.json();
}

async function GetStaff(session: any, establishmentId: string | null, role?: string) {
    let url = process.env.SERVER_API + '/users';
    if (establishmentId) {
        url += `?establishmentId=${establishmentId}`;
    }

    if (role) {
        url += `${establishmentId ? '&' : '?'}role=${role}`;
    }
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${session.user.tokens.accessToken}`,
        },
    });
    return await response.json();
}

async function GetActivities(session: any, establishmentId: string) {
    const response = await fetch(process.env.SERVER_API + `/activities?establishmentId=${establishmentId}`, {
        headers: {
            Authorization: `Bearer ${session.user.tokens.accessToken}`,
        },
    });
    return await response.json();
}

async function Dashboard() {
    const session = await getServerSession(options);
    const establishments: IEstablishments[] = await GetEstablishments(session);
    let dogs: IDogs[] = [];
    let sessions: IDailySession | null = null;
    let usersStaff: IUser[] = [];
    let activities: IActivity[] = [];
    if (establishments.length > 0) {
        dogs = await GetDogs(session, establishments[0]._id);
        sessions = await DailySessions(session, establishments[0]._id, format(new Date(), 'yyyy-MM-dd'));
        usersStaff = await GetStaff(session, establishments[0]._id, "Educator");
        activities = await GetActivities(session, establishments[0]._id);
    }

    return (
        <div className="grid grid-cols-2 justify-center items-start gap-x-12 my-4 w-full">
            <div className="wrapper">
                <h3 className="text-mainColor text-2xl font-bold">Session du jour</h3>
                <div className="flex flex-col gap-y-12 mt-9">
                    {sessions?.today && sessions?.today.length > 0 ? (
                        sessions.today.map((session, idx) => (
                            <div key={idx} className="flex justify-between bg-greyColor rounded-twenty px-5 py-2" >
                                <img
                                    src={session.activity.imageUrl}
                                    alt="Profile"
                                    className="avatar rounded-full"
                                />
                                <div className="flex flex-col font-ws font-bold">
                                    <p>Type : {session.activity.title}</p>
                                    <p>{"Le " + format(new Date(session.beginDate), "dd MMMM yyyy 'à' HH'h'mm", { locale: fr })}</p>
                                    <p>Tarif : {session.activity.price}€</p>
                                </div>
                                <img
                                    src={session.activity.imageUrl}
                                    alt="Profile"
                                    className="avatar rounded-full"
                                />
                            </div>
                        ))
                    ) : (<div>
                        <p>Vous n&apos;avez aucune session aujourd&apos;hui.</p>
                    </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-y-8">
                <div className="wrapper">
                    <div className="flex justify-between items-center">
                        <h3 className="text-mainColor text-2xl font-bold">Mes chiens</h3>
                        <Link href="/dogs" className="text-mainColor cursor-pointer">Voir plus</Link>
                    </div>
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
                {session?.user.user.role != 'Client' &&
                <div className="wrapper">
                    <div className="flex justify-between items-center">
                        <h3 className="text-mainColor text-2xl font-bold">Mon équipe</h3>
                        <Link href="/team" className="text-mainColor cursor-pointer">Voir plus</Link>
                    </div>
                    
                    <div className="flex flex-grow items-center gap-x-2">
                        {usersStaff && usersStaff.map((staff, idx) => (
                            <div key={idx} className="flex flex-col justify-center items-center">
                                <img
                                    src={staff?.avatarUrl ? staff?.avatarUrl : "/img/avatar.svg"}
                                    alt="Profile"
                                    className="avatar rounded-full"
                                />
                                <span className="text-xs font-bold">{staff.firstname}</span>
                                <span className="text-xs font-bold">{staff.role === 'Educator' ? "Educateur": "Manager"}</span>
                            </div>
                        ))}
                    </div>
                </div>
                }
                {session?.user.user.role != 'Client' &&
                <div className="wrapper">
                    <div className="flex justify-between items-center">
                        <h3 className="text-mainColor text-2xl font-bold">Mes activités</h3>
                        <Link href="/activities" className="text-mainColor cursor-pointer">Voir plus</Link>
                    </div>
                    <div className="flex flex-col gap-y-6 mt-9">
                        {activities && activities.map((activity, idx) => (
                            <div key={idx} className="flex w-full bg-greyColor p-2 rounded-twenty" >
                                <div className="flex items-center w-full">
                                    <div className="w-2/12">
                                        <img
                                            src={activity.imageUrl}
                                            alt="Profile"
                                            className="h-32 w-full rounded-twenty"
                                        />
                                    </div>

                                    <div className="w-4/6 h-full flex flex-col px-2">
                                        <h3 className="text-center text-mainColor font-bold">{activity.title}</h3>
                                        <p className="text-xs"><span className="font-bold">Description :</span> {activity.description}</p>
                                        <p className="text-xs"><span className="font-bold">Durée :</span> {activity.duration}min</p>
                                        <p className="text-xs"><span className="font-bold">Prix :</span> {activity.price}€</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
                }
            </div>
        </div>
    )
};

export default Dashboard;