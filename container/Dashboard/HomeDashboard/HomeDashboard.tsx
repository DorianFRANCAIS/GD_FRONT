import { SimpleGrid, Skeleton, Container, Stack } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import React from 'react'
import CalendarResume from '../../../components/Resumes/Calendar/CalendarResume';
import CentersResume from '../../../components/Resumes/Centers/CentersResume';
import EmployeesResume from '../../../components/Resumes/Employees/EmployeesResume';
import ProfileResume from '../../../components/Resumes/Profile/ProfileResume';
import useHomeDashboardStyles from './HomeDashboard.style'

const HomeDashboard = () => {

    const { classes, theme } = useHomeDashboardStyles();
    const { height } = useViewportSize();
    const getChild = (height: number) => <Skeleton height={height} radius="lg" animate={false} />;
    const getChildEmployees = (height: number) => <EmployeesResume height={height} radius="lg" />
    const getChildCenter = (height: number) => <CentersResume radius="lg" height={height} />
    const getChildProfileResume = (height: number) => <ProfileResume radius="lg" height={height} imageUrl="https://i.imgur.com/ofOEeOp.png" />
    const getChildCalendar = (height: number) => <CalendarResume height={height} radius="lg" />
    const BASE_HEIGHT = height / 1.1
    const getSubHeight = (children: number, spacing: number) =>
    BASE_HEIGHT / children - spacing * ((children - 1) / children);

  return (
    <div className={classes.wrapper}>
      <Container my="md">
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'xs', cols: 1 }]}>
          <Stack>
            {getChildEmployees(getSubHeight(2, theme.spacing.lg))}
            {getChildCalendar(getSubHeight(2, theme.spacing.lg))}
          </Stack>
          <Stack>
            {/* {getChildProfileResume(getSubHeight(3, theme.spacing.lg))} */}
            {getChildCenter(getSubHeight(3, theme.spacing.lg))}
            {/* {getChild(getSubHeight(3, theme.spacing.lg))} */}
          </Stack>
        </SimpleGrid>
      </Container>
    </div>
  )
}

export default HomeDashboard