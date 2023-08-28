'use client';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSession } from "next-auth/react";
import { PostSession } from "@/pages/api/sessions/route";
import { IUser } from "@/types/IUser";
import { IActivity } from "@/types/IActivity";
import { IEstablishments } from "@/types/IEstablishments";
import { RxCrossCircled } from 'react-icons/rx';
import { Modal } from "flowbite-react";

const sessionSchema = yup.object({
    educator: yup.string().required('Veuillez choisir un éducateur'),
    activity: yup.string().required('Veuillez choisir une activité'),
    establishment: yup.string().required('Veuillez choisir un établissement'),
    maximumCapacity: yup.number().required('Veuillez renseigner une capacité maximale'),
    beginDate: yup.string().required('Veuillez renseigner une date de début'),
}).required();

type FormData = yup.InferType<typeof sessionSchema>;

function NewEmployeeModal(props: { isModalEmployeeOpen: boolean, closeModalEmployee: () => void, establishments: IEstablishments[] }) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(sessionSchema),
        mode: "onSubmit"
    });
    const { data: session } = useSession();

    const onSubmit: SubmitHandler<FormData> = async (
        data: FormData
    ) => {
        const newBeginDate = new Date(data.beginDate)
        await PostSession(session, { ...data, beginDate: newBeginDate.toISOString(), status: "Pending" });
        props.closeModalEmployee();
    };

    return (
        <>
            <Modal show={props.isModalEmployeeOpen === true} size="2xl" popup onClose={props.closeModalEmployee}>
                <Modal.Header className="flex items-center border-b p-4">
                    <h3 className="text-xl font-semibold text-mainColor">
                        Ajout d'un nouvel employé
                    </h3>
                </Modal.Header>
                <Modal.Body>
                    <div className="px-6 py-6 lg:px-8">
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Capacité de la session</label>
                                <input
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    type="text"
                                    {...register("maximumCapacity")} />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date de la session</label>
                                <input
                                    type="datetime-local"
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    {...register("beginDate")}
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

export default NewEmployeeModal;