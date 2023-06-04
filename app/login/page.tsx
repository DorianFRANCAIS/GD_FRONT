'use client'
import { SubmitHandler, useForm } from "react-hook-form";
import { axiosClient } from "@/utils/apiClient";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {useRouter} from "next/navigation";

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
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (
    data: FormData
    ,
  ) => {
    try {
      const response = await axiosClient.post('/users/login',data,)
      const res = response.data
      if(res.tokens.accessToken) {
        const accessToken = res.tokens.accessToken
        const refreshToken = res.tokens.refreshToken

        localStorage.setItem("accesToken", accessToken)
        localStorage.setItem("refreshToken", refreshToken)
        await router.push('/');
      }

    } catch (error) {
      throw error;
    }
  }
    return (
        <div id="login-page" className="flex flex-col items-center w-full sm:h-fit bg-main p-12 sm:w-[40rem] sm:self-center sm:rounded-3xl sm:p-32 sm:drop-shadow-xl">
            <img src="/logo.svg"/>
            <h1>Bienvenue !</h1>
            <form className="mt-12 flex w-full flex-col items-stretch justify-center" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-3">
                    <input type="email" {...register("emailAddress")} placeholder="E-mail"/>
                    <input type="password" {...register("password")} placeholder="Mot de passe"/>
                </div>
                <button type="submit" className="btn mt-5">Connexion</button>
            </form>
        </div>
    )
}