'use client';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSession } from "next-auth/react";
import { PostSession } from "@/pages/api/sessions/sessionsApi";
import { IUser } from "@/types/IUser";
import { IActivity } from "@/types/IActivity";
import { IEstablishments } from "@/types/IEstablishments";
import { RxCrossCircled } from 'react-icons/rx';
import { Modal } from "flowbite-react";
import { ISession } from "@/types/ISession";
import { IEventSession } from "@/types/ICalendar";
import { format } from "date-fns";

const sessionSchema = yup.object({
    educator: yup.string().required('Veuillez choisir un éducateur'),
    activity: yup.string().required('Veuillez choisir une activité'),
    establishment: yup.string().required('Veuillez choisir un établissement'),
    maximumCapacity: yup.number().required('Veuillez renseigner une capacité maximale'),
    beginDate: yup.string().required('Veuillez renseigner une date de début'),
}).required();

type FormData = yup.InferType<typeof sessionSchema>;

function SessionInfosModal(props: { isModalInfosSessionOpen: boolean, closeModalInfosSession: () => void, selectedSession: IEventSession | null }) {
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
        props.closeModalInfosSession();
    };

    console.log(props.selectedSession)

    return (
        <>
            {props.selectedSession &&
                <Modal show={props.isModalInfosSessionOpen === true} size="2xl" popup onClose={props.closeModalInfosSession}>
                    <Modal.Header className="flex items-center border-b p-4">
                        <p className="text-xl font-semibold text-mainColor">
                            {props.selectedSession?.activity.title} {format(new Date(props.selectedSession?.beginDate), "'Le' dd/MM/yyyy 'à' HH'h'mm'")} avec {props.selectedSession?.educator.firstname} {props.selectedSession?.educator.lastname}
                        </p>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="px-6 py-6 lg:px-8">
                            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                {props.selectedSession?.maximumCapacity}

                                <button type="submit" className="btn w-full p-4 mt-5">Enregistrer</button>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
            }
        </>
    )
};

export default SessionInfosModal;