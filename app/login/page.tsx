export default function LoginPage() {
    return (
        <div id="login-page" className="flex flex-col items-center w-full sm:h-fit bg-main p-12 sm:w-[40rem] sm:self-center sm:rounded-3xl sm:p-32 sm:drop-shadow-xl">
            <img src="/logo.svg"/>
            <h1>Bienvenue !</h1>
            <form className="mt-12 flex w-full flex-col items-stretch justify-center">
                <div className="flex flex-col gap-3">
                    <input type="email" name="email" placeholder="E-mail"/>
                    <input type="password" name="password" placeholder="Mot de passe"/>
                </div>
                <button className="btn mt-5">Connexion</button>
            </form>
        </div>
    )
}