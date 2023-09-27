'use client';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSession } from "next-auth/react";
import { IUser } from "@/types/IUser";
import { IActivity } from "@/types/IActivity";
import { IEstablishments } from "@/types/IEstablishments";
import { Modal } from "flowbite-react";
import { IPostSession } from "@/types/ISession";
import { useState } from "react";
import { useRouter } from "next/navigation";

async function PostSession(session: any, sessionInfos: IPostSession) {
  const res = await fetch(process.env.LOCAL_API + `/api/sessions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session?.user.tokens.accessToken}`,
    },
    body: JSON.stringify(sessionInfos),
  });

  return await res.json()
}

const sessionSchema = yup.object({
  educator: yup.string().required('Veuillez choisir un éducateur'),
  activity: yup.string().required('Veuillez choisir une activité'),
  establishment: yup.string().required('Veuillez choisir un établissement'),
  maximumCapacity: yup.number().required('Veuillez renseigner une capacité maximale'),
  beginDate: yup.string().required('Veuillez renseigner une date de début'),
}).required();

type FormData = yup.InferType<typeof sessionSchema>;

function NewSessionModal(props: { isModalSessionOpen: boolean, closeModalSession: () => void, educators: IUser[], activities: IActivity[], establishments: IEstablishments[] }) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(sessionSchema),
    mode: "onSubmit"
  });
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormData> = async (
    data: FormData
  ) => {
    try  {
      const newBeginDate = new Date(data.beginDate)
      setIsLoading(true)
      await PostSession(session, { ...data, beginDate: newBeginDate.toISOString(), status: "Pending" });
    }catch(error){
      console.log(error)
    }finally {
      props.closeModalSession();
      router.refresh()
      setIsLoading(false)
    }
  };

  return (
    <>
      <Modal show={props.isModalSessionOpen === true} size="2xl" popup onClose={props.closeModalSession}>
        <Modal.Header className="flex items-center border-b p-4">
          <h3 className="text-xl font-semibold text-mainColor">
            Ajout d&apos;une nouvelle session
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="px-6 py-6 lg:px-8">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Educateur</label>
                <select className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" {...register("educator")}>
                  {props.educators.map((educator, idx) => {
                    return (
                      <option key={idx} value={educator._id}>{educator.firstname} {educator.lastname}</option>
                    )
                  })}
                </select>
              </div>
              <div className="">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Activité</label>
                <select className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" {...register("activity")}>
                  {props.activities.map((activity, idx) => {
                    return (
                      <option key={idx} value={activity._id}>{activity.title}</option>
                    )
                  })}
                </select>
              </div>
              <div className="">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Etablissement</label>
                <select className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" {...register("establishment")}>
                  {props.establishments.map((establishment, idx) => {
                    return (
                      <option key={idx} value={establishment._id}>{establishment.name}</option>
                    )
                  })}
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Capacité de la session</label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  type="number"
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

export default NewSessionModal;