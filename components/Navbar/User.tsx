import React, { useContext } from "react";
import { IconPlugOff } from "@tabler/icons";
import { Group, Text, Box, useMantineTheme, Image } from "@mantine/core";
import Link from "next/link";
import { AuthContext } from "../../context/AuthProvider";

export function User() {
  const theme = useMantineTheme();

  const {
    user: { name, firstName, email },
  }: any = useContext(AuthContext);

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
            {firstName} {name}
          </Text>
          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </Box>

        <Link href="/" onClick={() => console.log("unlogin")}>
          <IconPlugOff size={18} />
        </Link>
      </Group>
    </Box>
  );
}
