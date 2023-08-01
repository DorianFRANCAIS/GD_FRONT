export default async function handleEstablishments(session: any) {
    let ownerId: string = '';
    if (session) {
        ownerId = session.user.user._id;
    }
    try {
        const response = await fetch(process.env.SERVER_API + `/establishments?ownerId=${ownerId}`, {
            headers: {
                Authorization: `Bearer ${session.user.tokens.accessToken}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}