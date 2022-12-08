import { MantineNumberSize, Paper, Title, Timeline, Text } from '@mantine/core'
import { useState, useEffect } from 'react'
import useCalendarResumeStyles from './CalendarResume.style'
import Cookie from 'js-cookie';
import { IconCalendarTime } from '@tabler/icons';
import { format } from "date-fns";
import { useRouter } from "next/router";



const CalendarResume = ({ height, radius }: { height: number, radius: MantineNumberSize }) => {

  const { classes } = useCalendarResumeStyles();
  const [sessions, editSessions] = useState([])
  const [users, editUsers] = useState([])
  const [activity, editActivity] = useState([])
  const router = useRouter();



  useEffect(() => {
    retrieveSessions();
  }, []);

  const retrieveSessions = async () => {
    editUsers(await getApiUser());
    editActivity(await getApiActivity());
    const allSessions = await getApi()
    editSessions(allSessions.filter((a: any) =>
      a.beginDate.includes(new Date().getDate()) && a.beginDate.includes(new Date().getMonth() + 1)
    ).sort((a: any, b: any) =>  Date.parse(a.beginDate) - Date.parse(b.beginDate)));
  }

  const findTitleActivity = (s: any) => {
    const filtred: any = activity.filter((a: any) => a?.id === s.activityTypeId)[0]
    return filtred?.title || ''
  }

  const findNameEducator = (s: any) => {
    const filtred: any = users.filter((a: any) => a?.id === s.educatorId)[0]
    return filtred?.name || ''
  }

  return (
    <Paper
      radius={radius}
      className={classes.wrapper}
      sx={{ height: height, overflow: 'auto' }}
    >
      <Title>Calendrier</Title>
      <Timeline
        active={10}
        bulletSize={24}
        lineWidth={2}
        sx={{ marginLeft: 50, marginTop: 20 }}

      >
        {sessions.length 
          ? sessions.map((s: any, i: any) => (
          <Timeline.Item
            key={i}
            bullet={<IconCalendarTime size={12} />}
            title={"Activité: " + findTitleActivity(s)}
            onClick={() => router.push('/dashboard/my-calendar')}
          >
            <Text color="dimmed" size="sm">
              <span>De </span>
              {format(new Date(s.beginDate), "HH:mm").toString()}
              {s?.endDate && (
                <>
                  <span> à </span>
                  {format(new Date(s?.endDate), "HH:mm").toString()}
                </>
              )}
            </Text>

            <Text size="xs" mt={4}>La session est dirigée par: <b>{findNameEducator(s)}</b></Text>
          </Timeline.Item>
        )) : (
          <Text color="dimmed" size="sm">Aucune session planifiée aujourd&apos;hui.</Text>
        )
        }

      </Timeline>
    </Paper>
  )
}

const getApi = () => {
  return fetch(`${process.env.SERVER_API}/sessions`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + Cookie.get('token'),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json
    })
    .catch((error) => {
      console.log("error : " + error.message);
    });
};

const getApiUser = () => {
  return fetch(`${process.env.SERVER_API}/user`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + Cookie.get('token'),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json
    })
    .catch((error) => {
      console.log("error : " + error.message);
    });
};

const getApiActivity = () => {
  return fetch(`${process.env.SERVER_API}/activity-type`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + Cookie.get('token'),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json
    })
    .catch((error) => {
      console.log("error : " + error.message);
    });
};

export default CalendarResume