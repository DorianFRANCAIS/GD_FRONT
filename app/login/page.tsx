'use client'
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";

const loginSchema = yup.object({
  emailAddress: yup.string().required('Veuillez renseigner un E-mail').email(),
  password: yup.string().required('Mot de passe invalide'),
}).required();

type FormData = yup.InferType<typeof loginSchema>;

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
    mode: "onSubmit"
  });

  const onSubmit: SubmitHandler<FormData> = async (
    data: FormData
  ) => {
    const response = await signIn("credentials", {
      emailAddress: data.emailAddress,
      password: data.password,
      redirect: true,
      callbackUrl: "/dashboard"
    });
  };
  return (
    <div id="login-page" className="flex flex-col items-start w-full sm:h-fit bg-white p-12 sm:w-[40rem] sm:self-center sm:rounded-3xl sm:p-12 sm:drop-shadow-xl">
      <h1>Connectez vous</h1>
      <form className="mt-20 flex w-full flex-col items-stretch justify-center" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <div className="mb-4">
            <label className="text-lg	">Email</label>
            <input className="mt-2" type="email" {...register("emailAddress")} placeholder="E-mail" />
          </div>
          <div className="flex flex-col">
            <label className="text-lg	">Mot de passe</label>
            <input className="mt-2" type="password" {...register("password")} placeholder="Mot de passe" />
            <span className="flex justify-end text-mainColor mt-2 text-lg">Mot de passe oublié ?</span>
          </div>
        </div>
        <div className="flex flex-col">
          <button type="submit" className="btn p-8 mt-5">Connexion</button>
          <p className="flex justify-center text-mainColor my-2">Vous n'avez pas de compte ?  <span className="font-bold"> Inscrivez-vous</span></p>
        </div>
      </form>
    </div>
  )
}