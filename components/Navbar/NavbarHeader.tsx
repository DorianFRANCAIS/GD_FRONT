import React from 'react';
import { Group, ActionIcon, Box, Title, Image } from '@mantine/core';
import useDashboardStyles from '../../container/Dashboard/Dashboard.style';

interface NavbarHeaderProps {
  source: string;
}

export function NavbarHeader({ source }: NavbarHeaderProps) {
  const { classes, cx } = useDashboardStyles();

  return (
    <Box
      className={source === 'navbar' ? classes.navbarHeader : classes.headerMobile}
    >
      <Group position="apart">
        <ActionIcon component="a" href="/dashboard" size={45}>
          <Image alt="" src='/assets/dogIcon.png' width={45} height={45} />
        </ActionIcon>
        <Title order={2} className={classes.title}>Canine</Title>
      </Group>
    </Box>
  );
}