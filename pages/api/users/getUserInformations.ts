// pages/api/getData.js

export async function handleInfosUser(session: any) {
    try {
        const response = await fetch(process.env.SERVER_API + `/users/${session?.user.user._id}`, {
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

export async function GetAllStaff(session: any, establishmentId?: string, role?: string) {
    try {
        let url = process.env.SERVER_API + '/users';
        if (establishmentId) {
            url += `?establishmentId=${establishmentId}`;
        }

        if (role) {
            url += `${establishmentId ? '&' : '?'}role=${role}`;
        }
        const response = await fetch(url, {
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