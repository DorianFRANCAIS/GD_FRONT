'use client';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RxCrossCircled } from "react-icons/rx";
import { IEstablishments } from "@/types/IEstablishments";
import { PostActivity } from "@/pages/api/activities/route";
import { useSession } from "next-auth/react";
import { Modal } from "flowbite-react";

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

function NewActivityModal(props: { isModalAcitivityOpen: boolean, closeModalActivity: () => void, establishments: IEstablishments[] }) {
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
        <>
            <Modal show={props.isModalAcitivityOpen === true} size="2xl" popup onClose={props.closeModalActivity}>
                <Modal.Header className="flex items-center border-b p-4">
                    <h3 className="text-xl font-semibold text-mainColor">
                        Ajout d'un nouveau chien
                    </h3>
                </Modal.Header>
                <Modal.Body>
                    <div className="px-6 py-6 lg:px-8">
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-2 gap-x-2">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom de l'activité</label>
                                    <input
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        {...register("title")}
                                    />
                                </div>
                                <div className="">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Etablissement</label>
                                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("establishment")}>
                                        {props.establishments.map((establishment, idx) => {
                                            return (
                                                <option key={idx} value={establishment._id}>{establishment.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                    <Controller
                                        name="description"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <textarea className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...field} />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-x-2">
                                <div className="col-span-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo</label>
                                    <input
                                        type="file"
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        {...register("imageUrl")}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choisir une couleur</label>
                                    <input
                                        className="py-1 px-2 block w-full h-12 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 border-mainColor dark:text-gray-400"
                                        type="color"
                                        {...register("color")} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-2">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Durée de l'activitée</label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        type="number"
                                        {...register("duration")} />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prix</label>
                                    <div className="relative rounded-md flex">
                                        <input
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            type="number"
                                            {...register("price")} />
                                        <span className="absolute inset-y-0 right-0 pr-3 flex items-center">€</span>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn w-full p-4 mt-5">Enregistrer</button>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default NewActivityModal;