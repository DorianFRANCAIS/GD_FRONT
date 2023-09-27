'use client';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSession } from "next-auth/react";
import { IEstablishments, IEstablishmentsNewEmployee } from "@/types/IEstablishments";
import { Modal } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

async function PostEmployee(session: any, newEmployee: IEstablishmentsNewEmployee, establishmentId: string) {
    const response = await fetch(process.env.LOCAL_API + `/api/establishments/${establishmentId}/newEmployee`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
        },
        body: JSON.stringify(newEmployee),
    });
    return response.json();
}


const newEmployeeSchema = yup.object().shape({
    firstname: yup.string().required('Veuillez renseigner votre Nom'),
    lastname: yup.string().required('Veuillez renseigner votre Prénom'),
    avatarUrl: yup.string().required('Veuillez renseigner votre photo'),
    role: yup.string(),
    emailAddress: yup.string().required('Veuillez renseigner un E-mail').email(),
    birthDate: yup.string().required('Veuillez renseigner votre date de naissance'),
    phoneNumber: yup.string().required('Veuillez renseigner votre numéro de téléphone'),
    password: yup.string().required('Mot de passe invalide'),
}).required();

type FormData = yup.InferType<typeof newEmployeeSchema>;

function NewEmployeeModal(props: { isModalEmployeeOpen: boolean, closeModalEmployee: () => void, establishments: IEstablishments[] }) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(newEmployeeSchema),
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
            data.role = "Educator";
            await PostEmployee(session, data, props.establishments[0]._id);
        }catch(error){
            console.log(error)
        }finally {
            props.closeModalEmployee();
            router.refresh();
            setIsLoading(false)
        }
    };


    return (
        <>
            <Modal show={props.isModalEmployeeOpen === true} size="2xl" popup onClose={props.closeModalEmployee}>
                <Modal.Header className="flex items-center border-b p-4">
                    <h3 className="text-xl font-semibold text-mainColor">
                        Ajout d&apos;un nouvel employé
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
                            <button type="submit" className="btn p-8 mt-5">Enregistrer</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
};

export default NewEmployeeModal;