'use client';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSession } from "next-auth/react";
import { IEstablishments, IEstablishmentsNewClient } from "@/types/IEstablishments";
import { Modal } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

async function PostClient(session: any, newEmployee: IEstablishmentsNewClient, establishmentId: string) {
    const response = await fetch(process.env.LOCAL_API + `/api/establishments/${establishmentId}/newClient`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
        },
        body: JSON.stringify(newEmployee),
    });
    return response.json();
}


const newClientchema = yup.object().shape({
    firstname: yup.string().required('Veuillez renseigner votre Nom'),
    lastname: yup.string().required('Veuillez renseigner votre Prénom'),
    avatarUrl: yup.string().required('Veuillez renseigner votre photo'),
    role: yup.string(),
    emailAddress: yup.string().required('Veuillez renseigner un E-mail').email(),
    birthDate: yup.string().required('Veuillez renseigner votre date de naissance'),
    phoneNumber: yup.string().required('Veuillez renseigner votre numéro de téléphone'),
    password: yup.string().required('Mot de passe invalide'),
}).required();

type FormData = yup.InferType<typeof newClientchema>;

function NewClientModal(props: { isModalClientOpen: boolean, closeModalClient: () => void, establishments: IEstablishments[] }) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(newClientchema),
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
            data.role = "Client";
            await PostClient(session, data, props.establishments[0]._id);
        }catch(error){
            console.log(error)
        }finally {
            props.closeModalClient();
            router.refresh();
            setIsLoading(false)
        }
    };


    return (
        <>
            <Modal show={props.isModalClientOpen === true} size="2xl" popup onClose={props.closeModalClient}>
                <Modal.Header className="flex items-center border-b p-4">
                    <h3 className="text-xl font-semibold text-mainColor">
                        Ajout d&apos;un nouveau client
                    </h3>
                </Modal.Header>
                <Modal.Body>
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-3">
                            <div className="sm:flex gap-3">
                                <div className="flex flex-col w-full">
                                    <label className="text-lg">Nom</label>
                                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        type="text" {...register("lastname")} placeholder="Votre nom" />
                                    <p className="text-xs text-red-600">{errors.lastname?.message}</p>
                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="text-lg">Prénom</label>
                                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        type="text" {...register("firstname")} placeholder="Votre prénom" />
                                    <p className="text-xs text-red-600">{errors.firstname?.message}</p>
                                </div>
                            </div>
                            <div className="sm:flex gap-3">
                                <div className="flex flex-col w-full">
                                    <label className="text-lg">Email</label>
                                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        type="email" {...register("emailAddress")} placeholder="E-mail" />
                                    <p className="text-xs text-red-600">{errors.emailAddress?.message}</p>
                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="text-lg">Date de naissance</label>
                                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        type="date" {...register("birthDate")} placeholder="Date de naissance" />
                                    <p className="text-xs text-red-600">{errors.birthDate?.message}</p>
                                </div>
                            </div>
                            <div className="sm:flex flex-col">
                                <label className="text-lg">Téléphone</label>
                                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    type="phone" {...register("phoneNumber")} placeholder="Téléphone" />
                                <p className="text-xs text-red-600">{errors.phoneNumber?.message}</p>
                            </div>
                            <div className="col-span-4">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo</label>
                                <input
                                    type="text"
                                    placeholder="https://example.com/image.png"
                                    {...register("avatarUrl")}
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"

                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="text-lg">Mot de passe</label>
                                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    type="password" {...register("password")} placeholder="Mot de passe" />
                                <p className="text-xs text-red-600">{errors.password?.message}</p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <button type="submit" className="btn p-8 mt-5">
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
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
};

export default NewClientModal;