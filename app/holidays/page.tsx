import HolidaysPage from "@/container/Holidays/HolidaysPage";
import { IEstablishments } from "@/types/IEstablishments";
import { IHolidays } from "@/types/IHolidays";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

async function GetHolidays(session: any) {
    let establishmentId = session.user.user.establishments[0];
    const response = await fetch(process.env.SERVER_API + `/holidays?establishmentId=${establishmentId}`, {
        headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
        },
    });
    return await response.json();
}


async function Holidays() {
    const session = await getServerSession(options);
    const holidaysData: Promise<IHolidays[]> = await GetHolidays(session);
    const [holidays] = await Promise.all([holidaysData]);

    return (
        <div className="h-screen">
            <HolidaysPage session={session} holidays={holidays} />
        </div>
    )
};

export default Holidays;