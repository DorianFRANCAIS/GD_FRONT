import { MantineNumberSize, Paper, Title } from '@mantine/core'
import React from 'react'

const CalendarResume = ({ height, radius } : { height: number, radius: MantineNumberSize }) => {
  return (
    <Paper
        radius={radius}
        sx={{ height: height, backgroundColor: "gray"}}
    >
        <Title>Calendar</Title>
    </Paper>
  )
}

export default CalendarResume