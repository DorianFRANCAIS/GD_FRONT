'use client';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IEstablishmentsSelect } from "@/types/IEstablishments";
import { useSession } from "next-auth/react";
import { Modal } from "flowbite-react";
import { Dispatch, SetStateAction, useState } from "react";
import { IDogs, IPostDog } from "@/types/IDogs";
import { IUser } from "@/types/IUser";
import { useRouter } from "next/navigation";

async function PostDog(session: any, newDog: IPostDog) {
    const response = await fetch(process.env.LOCAL_API + `/api/dogs`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
        },
        body: JSON.stringify(newDog),
    });
    return response.json();
}

const dogSchema = yup.object({
    name: yup.string().required('Veuillez choisir un nom'),
    owner: yup.string(),
    nationalId: yup.string().required('Veuillez renseigner un ID national'),
    breed: yup.string().required('Veuillez renseigner la race'),
    height: yup.number().required('Veuillez renseigner une taille'),
    weight: yup.number().required('Veuillez renseigner un poids'),
    gender: yup.string().required('Veuillez renseigner le sexe'),
    establishment: yup.string().required('Veuillez sélectionner un établissement'),
    imageUrl: yup.string()
}).required();

type FormData = yup.InferType<typeof dogSchema>;

function NewDogModal(props: { establishments: IEstablishmentsSelect[], openModal: boolean, closeModalNewDog: () => void; setOpenModal: Dispatch<SetStateAction<boolean>>, client: IUser }) {
    const { register, control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(dogSchema),
        mode: "onSubmit"
    });
    const { data: session } = useSession();
    const router = useRouter();

    const onSubmit: SubmitHandler<FormData> = async (
        data: FormData
    ) => {
        data.owner = props.client._id
        await PostDog(session, data);
        props.closeModalNewDog();
        router.refresh();
    };
    return (
        <>
            <Modal show={props.openModal === true} size="2xl" popup onClose={() => props.setOpenModal(false)}>
                <Modal.Header className="flex items-center border-b p-4">
                    <h3 className="text-xl font-semibold text-mainColor">
                        Ajout d&apos;un nouveau chien
                    </h3>
                </Modal.Header>
                <Modal.Body>
                    <div className="px-6 py-6 lg:px-8">
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-2 gap-x-2">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
                                    <input
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        {...register("name")}
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID nationnal</label>
                                    <input
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        {...register("nationalId")}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-2">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Race</label>
                                    <input
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        {...register("breed")}
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sexe</label>
                                    <select
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        {...register("gender")}
                                    >
                                        <option selected>Sélectionnez le sexe</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Femelle</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-2">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Taille</label>
                                    <input
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        type="number"
                                        {...register("height")}
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Poids</label>
                                    <input
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        type="number"
                                        {...register("weight")}
                                    />
                                </div>
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Etablissement</label>
                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    {...register("establishment")}
                                >
                                    <option selected>Sélectionnez un établissement</option>
                                    {props.establishments && props.establishments.map((establishment, index) => (
                                        <option key={index} value={establishment._id}>{establishment.name}</option>
                                    ))}

                                </select>
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo</label>
                                <input
                                    type="text"
                                    placeholder="https://example.com/image.png"
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    {...register("imageUrl")}
                                />
                            </div>
                            <button type="submit" className="btn w-full p-4 mt-5">Enregistrer</button>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
};

export default NewDogModal;