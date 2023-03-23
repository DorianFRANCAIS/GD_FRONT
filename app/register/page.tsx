'use client'

import {SubmitHandler, useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from "axios";


const registerSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    emailAddress: yup.string().required().email(),
    birthDate: yup.string().required(),
    password: yup.string().required(),
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
        data: FormData,
    ) => {
        try {
            const response = await axios.post('https://dev.api.gestidogs.ianlcz.io/users/register',data)
            console.log(response)
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
                        <input className="my-2" type="text" {...register("lastName")} placeholder="Votre nom"/>
                        <p>{errors.lastName?.message}</p>
                        <input className="my-2" type="text" {...register("firstName")}   placeholder="Votre prénom"/>
                        <p>{errors.firstName?.message}</p>
                    </div>
                    <div className="sm:flex gap-3">
                        <input className="my-2" type="email" {...register("emailAddress")} placeholder="E-mail"/>
                        <p>{errors.emailAddress?.message}</p>
                        <input className="my-2" type="date" {...register("birthDate")} placeholder="Date de naissance"/>
                        <p>{errors.birthDate?.message}</p>
                    </div>
                    <div className="sm:flex gap-3">
                        <input className="my-2" type="password" {...register("password")} placeholder="Mot de passe"/>
                        <p>{errors.password?.message}</p>
                        <input className="my-2" type="password" {...register("passwordConfirm")} placeholder="Confirmez votre mot de passe"/>
                        <p>{errors.passwordConfirm?.message}</p>
                    </div>
                </div>
                <button className="btn mt-5" type="submit" >Enregistrer</button>
            </form>
        </div>
    )
}