import { MantineNumberSize, Paper, Title } from '@mantine/core'
import React from 'react'
import useCalendarResumeStyles from './CalendarResume.style'

const CalendarResume = ({ height, radius } : { height: number, radius: MantineNumberSize }) => {

  const { classes } = useCalendarResumeStyles();

  return (
    <Paper
        radius={radius}
        className={classes.wrapper}
        sx={{ height: height }}
    >
        <Title>Calendrier</Title>
    </Paper>
  )
}

export default CalendarResume