import { options } from "./api/auth/[...nextauth]/options";
import Dashboard from "./dashboard/page";
import LoginPage from "./login/page";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <div>
    {!session ?
     <LoginPage />
      :
      <></>
    }
  </div>
  )
}
