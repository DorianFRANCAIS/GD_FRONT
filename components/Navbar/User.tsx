import { useContext } from "react";
import { IconLogout } from "@tabler/icons";
import { Group, Text, Box, useMantineTheme, ActionIcon } from "@mantine/core";
import { AuthContext } from "../../context/AuthProvider";

export function User() {
  const theme = useMantineTheme();
  const { logOut }: any = useContext(AuthContext);

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

        <ActionIcon onClick={() => logOut()}>
          <IconLogout size={18} />
        </ActionIcon>
      </Group>
    </Box>
  );
}
