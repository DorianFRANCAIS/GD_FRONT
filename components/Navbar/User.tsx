import React from "react";
import { IconPlugOff } from "@tabler/icons";
import { Group, Text, Box, useMantineTheme, Image } from "@mantine/core";
import Link from "next/link";


export function User() {
  const theme = useMantineTheme();

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `1px solid ${theme.colors.gray[2]}`,
      }}
    >
      <Group>
        <Box sx={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            Yann Le Coz
          </Text>
          <Text color="dimmed" size="xs">
            ylcoz@icloud.com
          </Text>
        </Box>

        <Link href="/" onClick={() => console.log("unlogin")}>
          <IconPlugOff size={18} />
        </Link>
      </Group>
    </Box>
  );
}
