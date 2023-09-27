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
    const [isLoading, setIsLoading] = useState<boolean>(false);




    useEffect(() => {
        if (props.selectedSession) {
            const getRemainingPlaces = async () => {
                const res = await RemainingPlaces(session, props.selectedSession!._id)
                setRemainingPlaces(res.remainingPlaces)
            }
            getRemainingPlaces()
        }
    }, [session, props.selectedSession])

    const onSubmit: SubmitHandler<FormData> = async (
        data: FormData
    ) => {
        try  {
            setIsLoading(true)
            await CreateReport(session, props.selectedSession!._id, data);
        }catch(error){
            console.log(error)
        }finally {
            props.closeModalInfosSession();
            router.refresh()
            setIsLoading(false)
        }
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
                                {props.selectedSession?.status === "Online" ?
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