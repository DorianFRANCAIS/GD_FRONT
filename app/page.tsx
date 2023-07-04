import { useSession } from "next-auth/react";
import Dashboard from "./dashboard/page";
import LoginPage from "./login/page";

export default function Home() {
  const { data: session } = useSession();

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
