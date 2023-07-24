import Dashboard from "./dashboard/page";
import LoginPage from "./login/page";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      {session ?
        <Dashboard />
        :
        <LoginPage />
      }
    </div>
  )
}
