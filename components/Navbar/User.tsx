import { useContext } from "react";
import { IconLogout } from "@tabler/icons";
import { Group, Text, Box, useMantineTheme, ActionIcon } from "@mantine/core";
import { AuthContext } from "../../context/AuthProvider";
import { UserInterface } from "../../interfaces/User.interface";

export function User({ user }: { user: UserInterface}) {
  const theme = useMantineTheme();
  const { logOut }: any = useContext(AuthContext);

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
            {user.firstName} {user.name}
          </Text>
          <Text color="dimmed" size="xs">
            {user.email}
          </Text>
        </Box>

        <ActionIcon onClick={() => logOut()}>
          <IconLogout size={18} />
        </ActionIcon>
      </Group>
    </Box>
  );
}
