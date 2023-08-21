import HolidaysPage from "@/container/Holidays/HolidaysPage";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import handleEstablishments from "@/pages/api/establishments/establishmentsApi";
import { GetHolidays } from "@/pages/api/holidays/route";
import { IEstablishments } from "@/types/IEstablishments";
import { IHolidays } from "@/types/IHolidays";
import { getServerSession } from "next-auth";


async function Holidays() {
    const session = await getServerSession(authOptions);
    const establishments: IEstablishments[] = await handleEstablishments(session);
    let holidays: IHolidays[] = [];
    if (establishments.length > 0) {
        holidays = await GetHolidays(session, establishments[0]._id);
    }
    return (
        <div className="h-screen">
            <HolidaysPage session={session} holidays={holidays} />
        </div>
    )
};

export default Holidays;