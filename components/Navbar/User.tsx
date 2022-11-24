import React from 'react';
import { IconPlugOff } from '@tabler/icons';
import { Group, Avatar, Text, Box, useMantineTheme, Image } from '@mantine/core';
import Link from 'next/link';

export function User() {
  const theme = useMantineTheme();

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `1px solid ${theme.colors.gray[2]
          }`,
      }}
    >
        <Group>
          <Avatar
            radius="xl"
          >
            <Image width={50} height={50} alt="" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              Mehdi Test
            </Text>
            <Text color="dimmed" size="xs">
              test@gmail.com
            </Text>
          </Box>

          <Link href="/" onClick={() => console.log('unlogin')}>
            <IconPlugOff size={18} />
          </Link>
        </Group>
    </Box>
  );
}