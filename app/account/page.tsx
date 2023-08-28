import { format } from "date-fns";
import { fr } from 'date-fns/locale';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { IUser } from "@/types/IUser";

async function GetUserInformations(session: any) {
    const res = await fetch(process.env.SERVER_API + `/users/${session?.user.user._id}`, {
        headers: {
            Authorization: `Bearer ${session.user.tokens.accessToken}`,
        },
    });
    return res.json();
}



async function Page() {
    const session = await getServerSession(authOptions);
    const userInformations: IUser = await GetUserInformations(session);

    console.log(userInformations)

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
                        <div className="grid grid-cols-2 gap-x-2">
                            <div className="mb-6">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom/Prénom</label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type="text"
                                    defaultValue={userInformations?.firstname + " " + userInformations?.lastname}
                                    disabled
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Téléphone</label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type="text"
                                    defaultValue={userInformations?.phoneNumber ? userInformations?.phoneNumber : ""}
                                    disabled
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type="text"
                                    defaultValue={userInformations?.birthDate ? `${calculateAge(userInformations?.birthDate)} ans` : ""}
                                    disabled
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type="text"
                                    defaultValue={userInformations?.emailAddress}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Propriétaire de :</label>
                            <div className="flex bg-gray-50 rounded-twenty p-4 mt-5 w-full">
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
                    <div className="flex flex-col w-full mb-6">
                        <div className="flex flex-col flex-1">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Activités</label>
                            <div className="flex flex-grow bg-gray-50 rounded-twenty p-4 w-full">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
};

export default Page;