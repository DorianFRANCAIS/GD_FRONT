let establishmentIdWithoutQuotes: string;
export async function handleDogs(session: any, establishmentId: string | null) {
    if (establishmentId) {
        establishmentIdWithoutQuotes = establishmentId.replace(/"/g, "");
    }
    try {
        const response = await fetch(process.env.SERVER_API + `/dogs?establishmentId=${establishmentIdWithoutQuotes}`, {
            headers: {
                Authorization: `Bearer ${session.user.tokens.accessToken}`,
            },
        });
        const data = await response.json();

        if (response.status === 200) {
            console.log(data);
        }
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}