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
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit: SubmitHandler<FormData> = async (
        data: FormData
    ) => {
        try  {
            setIsLoading(true)
            data.owner = props.client._id
            await PostDog(session, data); 
        }catch(error){
            console.log(error)
        }finally {
            props.closeModalNewDog();
            router.refresh();
            setIsLoading(false)
        }
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
                            <button type="submit" className="btn w-full p-4 mt-5">
                                {isLoading ?
                                    <div className="flex justify-center" role="status">
                                        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    :
                                    "Enregistrer"
                                }
                            </button>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
};

export default NewDogModal;