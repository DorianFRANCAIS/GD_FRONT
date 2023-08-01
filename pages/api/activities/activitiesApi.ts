import { IPostActivity } from "@/types/IActivity";

export async function getActivities(session: any, establishmentId: string) {
    console.log("idi", establishmentId)
    try {
        const response = await fetch(process.env.SERVER_API + `/activities?establishmentId=${establishmentId}`, {
            headers: {
                Authorization: `Bearer ${session.user.tokens.accessToken}`,
            },
        });
        const data = await response.json();
        console.log("activities", data);
        if (response.status === 200) {
            console.log(data);
        }
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function PostActivity(session: any, newActivity: IPostActivity) {
    try {
        const response = await fetch(process.env.SERVER_API + `/activities`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session.user.tokens.accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newActivity),
        });
        await response.json();
        return true;
    } catch (error) {
        console.error('Error post data:', error);
    }
}