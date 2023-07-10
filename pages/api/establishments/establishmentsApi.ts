import { getSession } from "next-auth/react";

export default async function handler(req: any, res: any) {
    const session = await getSession({ req });
    const { ownerId } = req.query;
    if (!session?.user?.tokens.accessToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const response = await fetch(process.env.SERVER_API + `/establishments?ownerId=${ownerId}`, {
            headers: {
                Authorization: `Bearer ${session.user.tokens.accessToken}`,
            },
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
}