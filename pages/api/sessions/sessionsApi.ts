import { IPostSession, ISession } from "@/types/ISession";

export async function PostSession(session: any, sessionInfos: IPostSession) {
  console.log("infos", sessionInfos)
  console.log(session, "iciii")
  try {
    const response = await fetch(process.env.SERVER_API + `/sessions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.user.tokens.accessToken}`,
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
    console.log("url", params)

    let url = process.env.SERVER_API + `/sessions`;
    if (params.establishmentId) {
      url += `?establishmentId=${params.establishmentId}`;
    }
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