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
  console.log(props.activities)

  const onSubmit: SubmitHandler<FormData> = async (
    data: FormData
  ) => {
    const newBeginDate = new Date(data.beginDate)
    await PostSession(session, { ...data, beginDate: newBeginDate.toISOString(), status: "Pending" });
    props.closeModalSession();
  };

  return (
    <div className="flex justify-center p-6 z-50 w-full absolute">
      <form className="bg-blueColor flex flex-col justify-between p-8 w-fit rounded-md" onSubmit={handleSubmit(onSubmit)}>
        <div
          className="flex justify-end cursor-pointer"
          onClick={props.closeModalSession}
        >
          <RxCrossCircled className="text-mainColor font-bold h-6 w-6" />
        </div>
        <div className="flex flex-col gap-y-2 mt-4">
          <h2 className="text-3xl text-white">Créer une nouvelle session</h2>
          <div className="">
            <label className="text-white">Educateur</label>
            <select className="py-3 px-4 pr-9 block w-full border-mainColor rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" {...register("educator")}>
              {props.educators.map((educator, idx) => {
                return (
                  <option key={idx} value={educator._id}>{educator.firstname} {educator.lastname}</option>
                )
              })}
            </select>
          </div>
          <div className="">
            <label className="text-white">Activité</label>
            <select className="py-3 px-4 pr-9 block w-full border-mainColor rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" {...register("activity")}>
              {props.activities.map((activity, idx) => {
                return (
                  <option key={idx} value={activity._id}>{activity.title}</option>
                )
              })}
            </select>
          </div>
          <div className="">
            <label className="text-white">Etablissement</label>
            <select className="py-3 px-4 pr-9 block w-full border-mainColor rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" {...register("establishment")}>
              {props.establishments.map((establishment, idx) => {
                return (
                  <option key={idx} value={establishment._id}>{establishment.name}</option>
                )
              })}
            </select>
          </div>
          <div>
            <label className="text-white">Capacité de la session</label>
            <input
              className="py-3 px-4 block w-full rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 border-mainColor dark:text-gray-400"
              type="number"
              {...register("maximumCapacity")} />
          </div>
          <div>
            <label className="text-white">Date de la session</label>
            <input
              type="datetime-local"
              className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
              {...register("beginDate")}
            />
          </div>
        </div>
        <button type="submit" className="btn w-full p-4 mt-5">Enregistrer</button>
      </form>
    </div>
  )
};

export default NewSessionModal;