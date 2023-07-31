'use client';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RxCrossCircled } from "react-icons/rx";
import { IEstablishments } from "@/types/IEstablishments";
import { PostActivity } from "@/pages/api/activities/activitiesApi";
import { useSession } from "next-auth/react";

const activitySchema = yup.object({
    establishment: yup.string().required('Veuillez choisir un établissement'),
    title: yup.string().required('Veuillez renseigner un titre'),
    description: yup.string().required('Veuillez renseigner une description'),
    imageUrl: yup.string().required('Veuillez sélectionner une image'),
    color: yup.string().required('Veuillez renseigner une couleur'),
    duration: yup.number().required('Veuillez renseigner une durée'),
    price: yup.number().required('Veuillez renseigner un prix'),
}).required();

type FormData = yup.InferType<typeof activitySchema>;

function NewActivityModal(props: { isModalActivityOpen: boolean, closeModalActivity: () => void, establishments: IEstablishments[] }) {
    const { register, control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(activitySchema),
        mode: "onSubmit"
    });

    const { data: session } = useSession();

    const onSubmit: SubmitHandler<FormData> = async (
        data: FormData
    ) => {
        await PostActivity(session, data);
        //props.closeModalSession();
    };
    return (
        <div className="flex justify-center p-6 z-50 w-full absolute">
            <form className="bg-blueColor flex flex-col justify-between p-8 w-fit rounded-md" onSubmit={handleSubmit(onSubmit)}>
                <div
                    className="flex justify-end cursor-pointer"
                >
                    <RxCrossCircled className="text-mainColor font-bold h-6 w-6" />
                </div>
                <div className="flex flex-col gap-y-2 mt-4">
                    <h2 className="text-3xl text-white">Créer une nouvelle activitée</h2>
                    <div className="grid grid-cols-2 gap-x-2">
                        <div>
                            <label className="text-white">Nom de l'activité</label>
                            <input
                                className="py-3 px-4 block w-full rounded-md text-sm  dark:text-gray-400"
                                type="text"
                                {...register("title")} />
                        </div>
                        <div className="">
                            <label className="text-white">Etablissement</label>
                            <select className="py-3 px-4 pr-9 block w-full border-mainColor rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" {...register("establishment")}>
                                {props.establishments.map((establishment, idx) => {
                                    return (
                                        <option key={idx} value={establishment._id}>{establishment.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-white">Description</label>
                        <Controller
                            name="description"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <textarea className="py-3 px-4 block w-full rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 border-mainColor dark:text-gray-400" {...field} />
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-x-2">
                        <div>
                            <label className="text-white">Choisir une image</label>
                            <input
                                className="py-3 px-4 block w-full rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 border-mainColor dark:text-gray-400"
                                type="file"
                                {...register("imageUrl")} />
                        </div>
                        <div>
                            <label className="text-white">Choisir une couleur</label>
                            <input
                                className="py-1 px-2 block w-1/4 h-12 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 border-mainColor dark:text-gray-400"
                                type="color"
                                {...register("color")} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-2">
                        <div>
                            <label className="text-white">Durée de l'activitée</label>
                            <input
                                className="py-3 px-4 block w-full rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 border-mainColor dark:text-gray-400"
                                type="number"
                                {...register("duration")} />
                        </div>
                        <div>
                            <label className="text-white">Prix</label>
                            <div className="relative rounded-md border border-gray-300 flex">
                                <input
                                    className="input-without-arrow flex-1 py-3 px-4 block w-full rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 border-mainColor dark:text-gray-400"
                                    type="number"
                                    {...register("duration")} />
                                <span className="absolute inset-y-0 right-0 pr-3 flex items-center">€</span>
                            </div>
                        </div>
                    </div>

                </div>
                <button type="submit" className="btn w-full p-4 mt-5">Enregistrer</button>
            </form>
        </div>
    )
}

export default NewActivityModal;