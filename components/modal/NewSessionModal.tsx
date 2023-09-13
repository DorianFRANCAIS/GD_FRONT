'use client';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSession } from "next-auth/react";
import { IUser } from "@/types/IUser";
import { IActivity } from "@/types/IActivity";
import { IEstablishments } from "@/types/IEstablishments";
import { RxCrossCircled } from 'react-icons/rx';
import { Modal } from "flowbite-react";
import { IPostSession } from "@/types/ISession";

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

  const onSubmit: SubmitHandler<FormData> = async (
    data: FormData
  ) => {
    const newBeginDate = new Date(data.beginDate)
    await PostSession(session, { ...data, beginDate: newBeginDate.toISOString(), status: "Pending" });
    props.closeModalSession();
  };

  return (
    <>
      <Modal show={props.isModalSessionOpen === true} size="2xl" popup onClose={props.closeModalSession}>
        <Modal.Header className="flex items-center border-b p-4">
          <h3 className="text-xl font-semibold text-mainColor">
            Ajout d'une nouvelle session
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
              <button type="submit" className="btn w-full p-4 mt-5">Enregistrer</button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
};

export default NewSessionModal;