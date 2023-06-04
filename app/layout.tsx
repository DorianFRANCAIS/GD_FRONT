import Navbar from '@/components/Navbar'
import './globals.css'
import { RxDashboard } from "react-icons/rx";
import { MdOutlineHomeWork } from "react-icons/md";
import { AiFillCalendar } from "react-icons/ai";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar menuItem={[{ name: "Dashboard", icon: <RxDashboard />, url: "dashboard" },{ name: "Etablissements", icon: <MdOutlineHomeWork />, url: "establishments" },{ name: "Agenda", icon: <AiFillCalendar />, url: "agenda" }]} />
          <div className="w-full">{children}</div>
      </body>
    </html>
  )
}
