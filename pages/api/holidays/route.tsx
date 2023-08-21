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
