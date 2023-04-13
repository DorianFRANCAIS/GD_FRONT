import React from 'react';
import { Group, ActionIcon, useMantineColorScheme, Box, createStyles, Title, Image } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  title: {
    marginRight: 'auto',
  },
}));

export function Header() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes } = useStyles();


  return (
    <Box
      sx={(theme) => ({
        paddingLeft: theme.spacing.xs,
        paddingRight: theme.spacing.xs,
        paddingBottom: theme.spacing.lg,
        borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
          }`,
      })}
    >
      <Group position="apart">
        <ActionIcon component="a" href="/dashboard" size={45}>
          <Image width={50} height={50} alt="" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Circle-icons-computer.svg/2048px-Circle-icons-computer.svg.png" />
        </ActionIcon>
        <Title order={1} className={classes.title}>Canine</Title>
        <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
          {colorScheme === 'dark' ? <IconSun size={16} /> : <IconMoonStars size={16} />}
        </ActionIcon>
      </Group>
    </Box>
  );
}