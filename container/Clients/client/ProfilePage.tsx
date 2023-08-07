import { IUser } from "@/types/IUser";
import { format } from "date-fns";
import fr from "date-fns/locale/fr";

function ProfilePage(props: { client: IUser }) {
    return (
        props.client &&
        <div className="grid grid-cols-2 p-4">
            <div className="col-span-2 flex flex-col items-center">
                <img src={props.client.avatarUrl ? props.client.avatarUrl : "/img/avatar.svg"} alt="Photo de Profil"
                    className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg" />
                <h1 className="mt-5">{props.client.firstname} {props.client.lastname}</h1>
                <p>Client depuis le {format(new Date(props.client.registeredAt), 'dd MMMM yyyy', { locale: fr })}</p>
            </div>
            <div className="mt-4">
                <div className="mt-2">
                    <label className="block text-sm font-medium text-mainColor">Nom :</label>
                    <input
                        type="text"
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        defaultValue={props.client.lastname}
                    />
                </div>
                <div className="mt-2">
                    <label className="block text-sm font-medium text-mainColor">Prénom :</label>
                    <input
                        type="text"
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        defaultValue={props.client.firstname}
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-mainColor">Email :</label>
                    <input
                        type="text"
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        defaultValue={props.client.emailAddress}
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-mainColor">Téléphone :</label>
                    <input
                        type="text"
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        defaultValue={props.client.phoneNumber}
                    />
                </div>
                <button type="submit" className="btn w-full p-4 mt-5">Enregistrer</button>
            </div>
        </div>
    )
};

export default ProfilePage;