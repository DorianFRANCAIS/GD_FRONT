import { IPostSession } from "@/types/ISession";

export async function PostSession(session: any, sessionInfos: IPostSession) {
  try {
    const response = await fetch(process.env.SERVER_API + `/sessions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.user.tokens.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sessionInfos),
    });
    await response.json();
    return true;
  } catch (error) {
    console.error('Error post data:', error);
  }
}

export async function GetSessions(session: any, params: any) {
  try {
    let url = process.env.SERVER_API + `/sessions`;
    if (params.establishmentId) {
      url += `?establishmentId=${params.establishmentId}`;
    }
    if (params.clientId) {
      url += `?educatorId=${params.clientId}`;
    }
    console.log('url', url)
    const response = await fetch(url, {
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

export async function GetDailySessions(session: any, establishmentId: string, date: string) {
  try {
    const response = await fetch(process.env.SERVER_API + `/sessions/daily?establishmentId=${establishmentId}&date=${date}`, {
      headers: {
        Authorization: `Bearer ${session.user.tokens.accessToken}`,
      },
    });
    const data = await response.json();
    console.log("sessions daily", data)
    return data;
  } catch (error) {
    console.error('Error post data:', error);
  }
}