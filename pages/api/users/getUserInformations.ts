// pages/api/getData.js

export async function handleInfosUser(session: any) {
    try {
        const response = await fetch(process.env.SERVER_API + `/users/${session?.user.user._id}`, {
            headers: {
                Authorization: `Bearer ${session.user.tokens.accessToken}`,
            },
        });
        const data = await response.json();
        console.log("userInformations",data)

        if (response.status === 200) {
            console.log(data);
        }
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function GetAllStaff(session: any, establishmentId: string) {
    try {
        const response = await fetch(process.env.SERVER_API + `/users?establishmentId=${establishmentId}`, {
            headers: {
                Authorization: `Bearer ${session.user.tokens.accessToken}`,
            },
        });
        const data = await response.json();
        console.log("allUsers",data)
        if (response.status === 200) {
            console.log(data);
        }
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}