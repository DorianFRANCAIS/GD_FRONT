function ProfilePage() {
    return (
        <div className="p-4">
            <div className="relative">
                <img src="/img/avatar.svg" alt="Photo de Profil"
                    className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg" />
            </div>
            <div className="mt-4">
                <div className="mt-2">
                    <label className="block text-sm font-medium text-mainColor">Nom :</label>
                    <input
                        type="text"
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    />
                </div>
                <div className="mt-2">
                    <label className="block text-sm font-medium text-mainColor">Prénom :</label>
                    <input
                        type="text"
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-mainColor">Email :</label>
                    <input
                        type="text"
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-mainColor">Téléphone :</label>
                    <input
                        type="text"
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    />
                </div>
                <button type="submit" className="btn w-full p-4 mt-5">Enregistrer</button>
            </div>
        </div>
    )
};

export default ProfilePage;