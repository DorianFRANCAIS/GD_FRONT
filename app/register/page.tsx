'use client'

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { handleRegister } from "@/pages/api/users/route";
import { redirect } from "next/navigation";


const registerSchema = yup.object({
    firstname: yup.string().required('Veuillez renseigner votre Nom'),
    lastname: yup.string().required('Veuillez renseigner votre Prénom'),
    emailAddress: yup.string().required('Veuillez renseigner un E-mail').email(),
    birthDate: yup.string().required('Veuillez renseigner votre date de naissance'),
    phoneNumber: yup.string().required('Veuillez renseigner votre numéro de téléphone'),
    password: yup.string().required('Mot de passe invalide'),
    passwordConfirm: yup.string()
        .required('Veuillez saisir de nouveau votre mot de passe')
        .oneOf(
            [yup.ref('password')],
            'Les mots de passe ne correspondent pas. Veuillez réessayer.',
        ),
}).required();
type FormData = yup.InferType<typeof registerSchema>;

export default function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(registerSchema),
        mode: "onSubmit"
    });

    const onSubmit: SubmitHandler<FormData> = async (
        data: FormData
        ,
    ) => {
        const newDate = new Date(data.birthDate)
        await handleRegister({ ...data, birthDate: newDate.toISOString(), role: "Client" })
        redirect("/login")
    }

    return (
        <div className="flex flex-col items-start w-full sm:h-fit bg-white p-12 sm:w-[40rem] sm:self-center sm:rounded-3xl sm:p-12 sm:drop-shadow-xl">
            <h1>Inscrivez-vous</h1>
            <form className="mt-12 flex w-full flex-col items-stretch justify-center" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-3">
                    <div className="sm:flex gap-3">
                        <div className="flex flex-col w-full">
                            <label className="text-lg">Nom</label>
                            <input className="py-3 px-4 block w-full border-mainColor rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" type="text" {...register("lastname")} placeholder="Votre nom" />
                            <p className="text-xs text-red-600">{errors.lastname?.message}</p>
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="text-lg">Prénom</label>
                            <input className="py-3 px-4 block w-full border-mainColor rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" type="text" {...register("firstname")} placeholder="Votre prénom" />
                            <p className="text-xs text-red-600">{errors.firstname?.message}</p>
                        </div>
                    </div>
                    <div className="sm:flex gap-3">
                        <div className="flex flex-col w-full">
                            <label className="text-lg">Email</label>
                            <input className="py-3 px-4 block w-full border-mainColor rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" type="email" {...register("emailAddress")} placeholder="E-mail" />
                            <p className="text-xs text-red-600">{errors.emailAddress?.message}</p>
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="text-lg">Date de naissance</label>
                            <input className="py-3 px-4 block w-full border-mainColor rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" type="date" {...register("birthDate")} placeholder="Date de naissance" />
                            <p className="text-xs text-red-600">{errors.birthDate?.message}</p>
                        </div>
                    </div>
                    <div className="sm:flex flex-col">
                        <label className="text-lg">Téléphone</label>
                        <input className="py-3 px-4 block w-full border-mainColor rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" type="phone" {...register("phoneNumber")} placeholder="Téléphone" />
                        <p className="text-xs text-red-600">{errors.phoneNumber?.message}</p>
                    </div>
                    <div className="sm:flex gap-3">
                        <div className="flex flex-col w-full">
                            <label className="text-lg">Mot de passe</label>
                            <input className="py-3 px-4 block w-full border-mainColor rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" type="password" {...register("password")} placeholder="Mot de passe" />
                            <p className="text-xs text-red-600">{errors.password?.message}</p>
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="text-lg">Confirmer le mot de passe</label>
                            <input className="py-3 px-4 block w-full border-mainColor rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" type="password" {...register("passwordConfirm")} placeholder="Confirmez votre mot de passe" />
                            <p className="text-xs text-red-600">{errors.passwordConfirm?.message}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <button type="submit" className="btn p-8 mt-5">Inscription</button>
                    <p className="flex justify-center text-mainColor my-2">Vous avez déjà un compte ?  <span className="font-bold"> Connectez-vous</span></p>
                </div>
            </form>
        </div>
    )
}