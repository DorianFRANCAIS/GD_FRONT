'use client';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSession } from "next-auth/react";
import { Modal } from "flowbite-react";
import { IEventSession } from "@/types/ICalendar";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { ISessionReport } from "@/types/ISession";


export async function RemainingPlaces(session: any, sessionId: string) {
    const response = await fetch(process.env.LOCAL_API + `/api/sessions/${sessionId}/remaining-places`, {
        headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
        },
    });
    return response.json();
}

export async function CreateReport(session: any, sessionId: string, report: ISessionReport) {
    const response = await fetch(process.env.LOCAL_API + `/api/sessions/${sessionId}/report`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
        },
        body: JSON.stringify(report),
    });
    return response.json();
}

const sessionInfosSchema = yup.object({
    report: yup.string().required("Veuillez remplir le rapport de la session"),
}).required();

type FormData = yup.InferType<typeof sessionInfosSchema>;

function SessionInfosModal(props: { isModalInfosSessionOpen: boolean, closeModalInfosSession: () => void, selectedSession?: IEventSession }) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(sessionInfosSchema),
        mode: "onSubmit"
    });
    const [remainingPlaces, setRemainingPlaces] = useState<number>(0)
    const { data: session } = useSession();
    const router = useRouter();




    useEffect(() => {
        if (props.selectedSession) {
            const getRemainingPlaces = async () => {
                const res = await RemainingPlaces(session, props.selectedSession!._id)
                setRemainingPlaces(res.remainingPlaces)
            }
            getRemainingPlaces()
        }
    }, [session])

    const onSubmit: SubmitHandler<FormData> = async (
        data: FormData
    ) => {
        await CreateReport(session, props.selectedSession!._id, data);
        props.closeModalInfosSession();
        router.refresh()
    };
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
                                    <p>{session?.user.user.role !== 'Client' && remainingPlaces === 0 ? "Aucune places restantes" : `Places restante pour la session : ${remainingPlaces} `}</p>
                                </div>
                                <div className="bg-gray-100 p-4 rounded-md">
                                    <h2 className="text-lg font-semibold mb-2">Rapport de la session :</h2>
                                    <textarea className="w-full h-40 border-none focus:outline-none bg-gray-100" disabled={props.selectedSession?.status === "Pending" || session?.user.user.role === 'Client' ? true : false}  {...register("report")} defaultValue={props.selectedSession?.report}></textarea>
                                </div>
                                {props.selectedSession?.status === "Confirmed" ?
                                    <button type="submit" className="btn w-full p-4 mt-5">Enregistrer</button>
                                    :
                                    <></>
                                }
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
            }
        </>
    )
};

export default SessionInfosModal;