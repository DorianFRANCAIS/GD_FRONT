'use client';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSession } from "next-auth/react";
import { PostSession } from "@/pages/api/sessions/sessionsApi";
import { Modal } from "flowbite-react";
import { IEventSession } from "@/types/ICalendar";
import { format } from "date-fns";
import { AiFillPlusCircle, AiOutlineDelete } from "react-icons/ai";

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
                        <p className="text-xl font-semibold text-mainColor">{props.selectedSession?.activity.duration} minutes</p>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="px-6 py-6 lg:px-8">
                            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex justify-between items-center">
                                    <p>Places restante pour la session : 0/{props.selectedSession?.maximumCapacity}</p>
                                    <button><AiFillPlusCircle className="text-mainColor h-8 w-8" /></button>
                                </div>
                                <div className="bg-gray-100 p-4 rounded-md">
                                    <h2 className="text-lg font-semibold mb-2">Chiens présents :</h2>
                                    <ul className="grid grid-cols-3 gap-4">
                                        <li className="flex items-center space-x-4">
                                            <img src="/logo_gestidogs.png" className="h-10 w-10 rounded-full" />
                                            <span>YAJKI</span>
                                            <button className="text-red-500 hover:text-red-700">
                                                <AiOutlineDelete className="h-5 w-5" />
                                            </button>
                                        </li>
                                        <li className="flex items-center space-x-4">
                                            <img src="/logo_gestidogs.png" className="h-10 w-10 rounded-full" />
                                            <span>YAJKI</span>
                                            <button className="text-red-500 hover:text-red-700">
                                                <AiOutlineDelete className="h-5 w-5" />
                                            </button>
                                        </li>
                                        <li className="flex items-center space-x-4">
                                            <img src="/logo_gestidogs.png" className="h-10 w-10 rounded-full" />
                                            <span>YAJKI</span>
                                            <button className="text-red-500 hover:text-red-700">
                                                <AiOutlineDelete className="h-5 w-5" />
                                            </button>
                                        </li>
                                        <li className="flex items-center space-x-4">
                                            <img src="/logo_gestidogs.png" className="h-10 w-10 rounded-full" />
                                            <span>YAJKI</span>
                                            <button className="text-red-500 hover:text-red-700">
                                                <AiOutlineDelete className="h-5 w-5" />
                                            </button>
                                        </li>
                                    </ul>
                                </div>

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