'use client';

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Modal } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { IPostHolidays } from "@/types/IHolidays";
import { IEstablishments } from "@/types/IEstablishments";

async function PostHolidays(session: any, newHolidays: IPostHolidays) {
    const res = await fetch(process.env.LOCAL_API + `/api/holidays`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
        },
        body: JSON.stringify(newHolidays),
    });

    return await res.json()
}

const holidaysSchema = yup.object({
    employee: yup.string(),
    establishment: yup.string(),
    beginDate: yup.string().required('Veuillez renseigner une date de début'),
    endDate: yup.string().required('Veuillez choisir une date de fin'),
    status: yup.string()
}).required();

type FormData = yup.InferType<typeof holidaysSchema>;

function NewHolidaysModal(props: { session: any, isModalHolidaysOpen: boolean, closeModalHolidays: any, establishments: IEstablishments[] }) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(holidaysSchema),
        mode: "onSubmit"
    });
    const { data: session } = useSession();

    const onSubmit: SubmitHandler<FormData> = async (
        data: FormData
    ) => {
        data.employee = session?.user.user._id;
        data.establishment = props.establishments[0]._id;
        data.status = "Pending";
        await PostHolidays(session, data);
        props.closeModalHolidays();
    };
    return (
        <>
            <Modal show={props.isModalHolidaysOpen === true} size="2xl" popup onClose={props.closeModalHolidays}>
                <Modal.Header className="flex items-center border-b p-4">
                    <h3 className="text-xl font-semibold text-mainColor">
                        Nouvelle demande de congés
                    </h3>
                </Modal.Header>
                <Modal.Body>
                    <div className="px-6 py-6 lg:px-8">
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-2 gap-x-2">
                                <div className="flex items-center">
                                    <label className="block mb-2 mr-2 text-sm font-medium text-gray-900 dark:text-white">Du</label>
                                    <input
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        type="date"
                                        {...register("beginDate")} />
                                </div>
                                <div className="flex items-center">
                                    <label className="block mb-2 mr-2 text-sm font-medium text-gray-900 dark:text-white">Au</label>
                                    <input
                                        type="date"
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        {...register("endDate")}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn w-full p-4 mt-5">Enregistrer</button>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
};

export default NewHolidaysModal;