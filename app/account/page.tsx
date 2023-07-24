import { format } from "date-fns";
import { fr } from 'date-fns/locale';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { handleInfosUser } from "@/pages/api/users/getUserInformations";
export interface IUser {
    _id: string;
    lastname: string;
    firstname: string;
    avatarUrl: string;
    role: string;
    emailAddress: string;
    phoneNumber: string;
    birthDate: string;
    activities: [];
    stripeId: string;
    registeredAt: string;
    lastConnectionAt: string;
    __v: 0
}



async function Page() {
    const session = await getServerSession(authOptions);
    const userInformations: IUser = await handleInfosUser(session);

    const calculateAge = (dateOfBirth: any) => {
        const birthDate = new Date(dateOfBirth);
        const currentDate = new Date();

        let age = currentDate.getFullYear() - birthDate.getFullYear();

        // Vérifie si l'anniversaire est déjà passé dans l'année actuelle
        const birthMonth = birthDate.getMonth();
        const currentMonth = currentDate.getMonth();
        const birthDay = birthDate.getDate();
        const currentDay = currentDate.getDate();

        if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
            age--;
        }

        return age;
    }

    const formatDateToFrench = (dateString: any) => {
        const formattedDate = format(new Date(dateString), 'dd MMMM yyyy', { locale: fr });
        return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1); // Mettre la première lettre en majuscule
    }

    return (
        <div className="flex justify-center items-start gap-x-12 w-full">
            <div className="bg-greyColor w-full p-6 rounded-md ">
                <div className="flex gap-x-8 w-full">
                    <img
                        src={userInformations?.avatarUrl ? userInformations?.avatarUrl : "/img/avatar.svg"}
                        alt="Profile"
                        className="h-36 w-36 rounded-full"
                    />
                    <div className="flex flex-col w-full">
                        <div>
                            <label className="font-bold">Prénom / Nom</label>
                            <div className="flex items-center bg-white rounded-twenty p-4 mt-5 input-custom w-full">
                                <p className="font-bold">{userInformations?.firstname} {userInformations?.lastname}</p>
                            </div>
                        </div>
                        <div>
                            <label className="font-bold">Âge</label>
                            <div className="bg-white rounded-twenty p-4 mt-5 w-full flex items-center input-custom">
                                <p className="font-bold">{userInformations?.birthDate ? `${calculateAge(userInformations?.birthDate)} ans` : ""}</p>
                            </div>
                        </div>
                        <div>
                            <label className="font-bold">Adresse mail</label>
                            <div className="bg-white rounded-twenty p-4 mt-5 w-full flex items-center input-custom">
                                <p className="font-bold">{userInformations?.emailAddress}</p>
                            </div>
                        </div>
                        <div>
                            <label className="font-bold">Propriétaire de :</label>
                            <div className="flex bg-white rounded-twenty p-4 mt-5 w-full">
                                <div className="flex flex-col items-center">
                                    <img
                                        src={userInformations?.avatarUrl ? userInformations?.avatarUrl : "/img/avatar.svg"}
                                        alt="Profile"
                                        className="avatar rounded-full"
                                    />
                                    <span className="text-xs font-bold">Yuki</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div>
                            <label className="font-bold">Numéro de téléphone</label>
                            <div className="bg-white rounded-twenty p-4 mt-5 w-1/2 flex items-center input-custom">
                                <p className="font-bold">{userInformations?.phoneNumber ? userInformations?.phoneNumber : ""}</p>
                            </div>
                        </div>
                        <div>
                            <label className="font-bold">Date de naissance</label>
                            <div className="bg-white rounded-twenty p-4 mt-5 w-1/2 flex items-center input-custom">
                                <p className="font-bold">{userInformations?.birthDate}</p>
                            </div>
                        </div>
                        <div className="flex flex-col flex-1">
                            <label className="font-bold">Activités</label>
                            <div className="flex flex-grow bg-white rounded-twenty p-4 mt-5 w-full">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Page;