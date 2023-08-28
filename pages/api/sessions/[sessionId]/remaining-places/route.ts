export async function GET(session: any, sessionId: string) {
    try {
        const response = await fetch(process.env.SERVER_API + `/sessions/${sessionId}/remaining-places`, {
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