import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {  useSession } from "next-auth/react";

const sessionSchema = yup.object({
  educator: yup.string().required('Veuillez choisir un éducateur').email(),
  activity: yup.string().required('Veuillez choisir une activité'),
  establishment: yup.string().required('Veuillez choisir un établissement'),
  maximumCapacity: yup.number().required('Veuillez renseigner une capacité maximale'),
  beginDate: yup.date().required('Veuillez renseigner une date de début'),
}).required();

type FormData = yup.InferType<typeof sessionSchema>;

export default function NewSessionModal(props:{isModalSessionOpen: boolean}) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(sessionSchema),
    mode: "onSubmit"
  });
  const { data: session, status } = useSession();

  const onSubmit: SubmitHandler<FormData> = async (
    data: FormData
  ) => {
    if (status === 'authenticated') {
      try {
        const postNewSession = await fetch(`/api/sessions/dogsApi`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
          },
          body: JSON.stringify(data),
        });
        const res = await postNewSession.json();
        console.log(res)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };
  return (
    <div className="flex justify-center h-full p-6 z-50 w-full absolute">
      <form className="bg-blueColor flex flex-col justify-between p-8 w-fit rounded-md" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-2 mt-4">
          <h2 className="text-3xl text-white">Créer une nouvelle session</h2>
          <div className="">
            <label className="text-white">Educateur</label>
            <select className="input-custom">
              <option value="1">Educateur</option>
            </select>
          </div>
          <div className="">
            <label className="text-white">Activité</label>
            <select className="input-custom">
              <option value="1">Educateur</option>
            </select>
          </div>
          <div className="">
            <label className="text-white">Etablissement</label>
            <select className="input-custom">
              <option value="1">Educateur</option>
            </select>
          </div>
          <div>
            <label className="text-white">Capacité de la session</label>
            <input className="input-custom" type="number"/>
          </div>
        </div>
        <button className="btn p-4">Créer la session</button>
      </form>
    </div>
  )
}