export async function GET(session: any, activityId: string) {
    try {
        const response = await fetch(process.env.SERVER_API + `/activities?activityId=${activityId}`, {
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