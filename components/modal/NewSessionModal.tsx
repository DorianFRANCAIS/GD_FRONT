'use client';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSession } from "next-auth/react";
import handleEstablishments from "@/pages/api/establishments/establishmentsApi";
import { PostSession } from "@/pages/api/sessions/sessionsApi";
import { ISession } from "@/types/ISession";
import { GetAllStaff } from "@/pages/api/users/getUserInformations";
import { IUser } from "@/types/IUser";
import { IActivity } from "@/types/IActivity";
import { IEstablishments } from "@/types/IEstablishments";

const sessionSchema = yup.object({
  educator: yup.string().required('Veuillez choisir un éducateur'),
  activity: yup.string().required('Veuillez choisir une activité'),
  establishment: yup.string().required('Veuillez choisir un établissement'),
  maximumCapacity: yup.number().required('Veuillez renseigner une capacité maximale'),
  beginDate: yup.string().required('Veuillez renseigner une date de début'),
}).required();

type FormData = yup.InferType<typeof sessionSchema>;

function NewSessionModal(props: { isModalSessionOpen: boolean, educators: IUser[], activities: IActivity[], establishments: IEstablishments[] }) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(sessionSchema),
    mode: "onSubmit"
  });
  const { data: session, status } = useSession();

  const onSubmit: SubmitHandler<FormData> = async (
    data: FormData
  ) => {
    console.log('yo')
    await PostSession(session, { ...data, status: "Pending" });
  };
  return (
    <div className="flex justify-center h-full p-6 z-50 w-full absolute">
      <form className="bg-blueColor flex flex-col justify-between p-8 w-fit rounded-md" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-2 mt-4">
          <h2 className="text-3xl text-white">Créer une nouvelle session</h2>
          <div className="">
            <label className="text-white">Educateur</label>
            <select className="input-custom" {...register("educator")}>
              {props.educators.map((educator, idx) => {
                return (
                  <option key={idx} value={educator._id}>{educator.firstname} {educator.lastname}</option>
                )
              })}
            </select>
          </div>
          <div className="">
            <label className="text-white">Activité</label>
            <select className="input-custom" {...register("activity")}>
              {props.activities.map((activity, idx) => {
                return (
                  <option key={idx} value={activity._id}>{activity.title}</option>
                )
              })}
            </select>
          </div>
          <div className="">
            <label className="text-white">Etablissement</label>
            <select className="input-custom" {...register("establishment")}>
              {props.establishments.map((establishment, idx) => {
                return (
                  <option key={idx} value={establishment._id}>{establishment.name}</option>
                )
              })}
            </select>
          </div>
          <div>
            <label className="text-white">Capacité de la session</label>
            <input className="input-custom" type="number" {...register("maximumCapacity")} />
          </div>
          <div>
            <label className="text-white">Date de la session</label>
            <input className="input-custom" type="datetime-local" {...register("beginDate")} />
          </div>
        </div>
        <button type="submit" className="btn p-4">Créer la session</button>
      </form>
    </div>
  )
};

export default NewSessionModal;