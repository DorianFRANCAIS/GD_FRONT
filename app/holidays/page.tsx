import HolidaysPage from "@/container/Holidays/HolidaysPage";
import { IEstablishments } from "@/types/IEstablishments";
import { IHolidays } from "@/types/IHolidays";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

async function GetEstablishments(session: any) {
    let url:string = '';
    if (session.user.user.role === "Manager") {
        url = process.env.SERVER_API + `/establishments?ownerId=${session.user.user._id}`
    }else {
        url = process.env.SERVER_API + `/establishments?clientId=${session.user.user._id}`
    }
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${session.user.tokens.accessToken}`,
        },
    });
    return await response.json();
}

async function GetHolidays(session: any, establishmentId: string) {

    const response = await fetch(process.env.SERVER_API + `/holidays?establishmentId=${establishmentId}`, {
        headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
        },
    });
    return await response.json();
}


async function Holidays() {
    const session = await getServerSession(options);
    const establishments: IEstablishments[] = await GetEstablishments(session);
    let holidays: IHolidays[] = [];
    if (establishments.length > 0) {
        holidays = await GetHolidays(session, establishments[0]._id);
    }
    return (
        <div className="h-screen">
            <HolidaysPage session={session} holidays={holidays} establishments={establishments} />
        </div>
    )
};

export default Holidays;