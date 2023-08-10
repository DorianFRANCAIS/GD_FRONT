import { IDogs, IPostDog } from "@/types/IDogs";

let establishmentIdWithoutQuotes: string;
export async function handleDogs(session: any, establishmentId?: string | null, ownerId?: string) {
    let url = process.env.SERVER_API + `/dogs`;
    if (establishmentId) {
        establishmentIdWithoutQuotes = establishmentId.replace(/"/g, "");
        url += `?establishmentId=${establishmentIdWithoutQuotes}`;
    }
    if (ownerId) {
        url += `?ownerId=${ownerId}`;
    }
    console.log("url", url)
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${session.user.tokens.accessToken}`,
            },
        });
        const data = await response.json();
        console.log("data", data)
        if (response.status === 200) {
            console.log(data);
        }
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function PostDog(session: any, newDog: IPostDog) {
    try {
        const response = await fetch(process.env.SERVER_API + `/dogs`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session.user.tokens.accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newDog),
        });
        await response.json();
        return true;
    } catch (error) {
        console.error('Error post data:', error);
    }
}