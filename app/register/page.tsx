'use client'

import {SubmitHandler, useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { axiosClient } from "@/utils/apiClient";


const registerSchema = yup.object({
    firstname: yup.string().required('Veuillez renseigner votre Nom'),
    lastname: yup.string().required('Veuillez renseigner votre Prénom'),
    emailAddress: yup.string().required('Veuillez renseigner un E-mail').email(),
    birthDate: yup.string().required('Veuillez renseigner votre date de naissance'),
    phoneNumber: yup.string().required('Veuillez renseigner votre numéro de téléphone'),
    password: yup.string().required('Mot de passe invalide'),
    passwordConfirm:yup.string()
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
        try {
            const response = await axiosClient.post('/users/register',data,)
            return response
        } catch (error) {
            throw error;
        }
    }

    return (
        <div id="register-page" className="sm:h-fit w-full bg-main p-12 sm:w-[40rem] sm:self-center sm:rounded-3xl sm:p-26 sm:drop-shadow-xl">
            <h1 className="text-center">Création de votre compte</h1>
            <form className="mt-12 flex w-full flex-col items-stretch justify-center" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-3">
                    <div className="sm:flex gap-3">
                        <div className="flex flex-col w-full">
                            <input className="my-2" type="text" {...register("lastname")} placeholder="Votre nom"/>
                            <p className="text-xs text-red-600">{errors.lastname?.message}</p>
                        </div>
                        <div className="flex flex-col w-full">
                            <input className="my-2" type="text" {...register("firstname")}   placeholder="Votre prénom"/>
                            <p className="text-xs text-red-600">{errors.firstname?.message}</p>
                        </div>
                    </div>
                    <div className="sm:flex gap-3">
                        <div className="flex flex-col w-full">
                            <input className="my-2" type="email" {...register("emailAddress")} placeholder="E-mail"/>
                            <p className="text-xs text-red-600">{errors.emailAddress?.message}</p>
                        </div>
                        <div className="flex flex-col w-full">
                            <input className="my-2" type="date" {...register("birthDate")} placeholder="Date de naissance"/>
                            <p className="text-xs text-red-600">{errors.birthDate?.message}</p>
                        </div>
                    </div>
                    <div className="sm:flex flex-col">
                        <input className="my-2" type="phone" {...register("phoneNumber")} placeholder="Téléphone"/>
                        <p className="text-xs text-red-600">{errors.phoneNumber?.message}</p>
                    </div>
                    <div className="sm:flex gap-3">
                        <div className="flex flex-col w-full">
                            <input className="my-2" type="password" {...register("password")} placeholder="Mot de passe"/>
                            <p className="text-xs text-red-600">{errors.password?.message}</p>
                        </div>
                        <div className="flex flex-col w-full">
                            <input className="my-2" type="password" {...register("passwordConfirm")} placeholder="Confirmez votre mot de passe"/>
                            <p className="text-xs text-red-600">{errors.passwordConfirm?.message}</p>
                        </div>
                    </div>
                </div>
                <button className="btn mt-5" type="submit" >Enregistrer</button>
            </form>
        </div>
    )
}