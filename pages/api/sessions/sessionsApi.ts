import { ISession } from "@/types/ISession";

export async function PostSession(session: any, sessionInfos: ISession) {
  try {
    const response = await fetch(process.env.SERVER_API + `/sessions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.user.tokens.accessToken}`,
      },
      body: JSON.stringify({ ...sessionInfos, beginDate: new Date(sessionInfos.beginDate).toISOString() }),
    });
    await response.json();
    return true;
  } catch (error) {
    console.error('Error post data:', error);
  }
}

export async function GetSessions(session: any,params: any) {
  try {
    console.log("url",params)

    let url = process.env.SERVER_API + `/sessions`;
    if (params.establishmentId) {
      url += `?establishmentId=${params.establishmentId}`;
    }
    if(params.begin) {
      url += `&begin=${params.begin}`;
    }
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${session.user.tokens.accessToken}`,
      },
    });
    const data = await response.json();
    console.log("sessions",data)
    return data;
  } catch (error) {
    console.error('Error post data:', error);
  }
}