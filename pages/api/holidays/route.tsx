import { IHolidays, IPutHolidays } from "@/types/IHolidays";

export async function GetHolidays(session: any, establishmentId: string) {
    try {
        const response = await fetch(process.env.SERVER_API + `/holidays?establishmentId=${establishmentId}`, {
            headers: {
                Authorization: `Bearer ${session.user.tokens.accessToken}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error post data:', error);
    }
}

export async function UpdateHolidayStatus(session: any, holidayId: string, holiday: IPutHolidays) {
    try {
        const response = await fetch(process.env.SERVER_API + `/holidays/${holidayId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${session.user.tokens.accessToken}`,
            },
            body: JSON.stringify(holiday),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error post data:', error);
    }
}
