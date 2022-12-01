import React, { useEffect, useState } from "react";
import {
  ActionIcon,
  Button,
  Group,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import { IconEye, IconPencil, IconTrash, IconUserPlus } from "@tabler/icons";

interface IEmployee {
  name: string;
  firstname: string;
  email: string;
  phoneNumber: string;
  lastConnection: Date;
}

const MyEmployees = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  useEffect(() => {
    setEmployees([
      {
        name: "Lefort",
        firstname: "Edgar",
        email: "edgar.lefort@ynov.com",
        phoneNumber: "0645329078",
        lastConnection: new Date("2022-11-29T11:10:00.000"),
      },
      {
        name: "Chambaud",
        firstname: "Mathieu",
        email: "mchambaud2000@gmail.com",
        phoneNumber: "0645329079",
        lastConnection: new Date("2021-11-22T11:10:00.000"),
      },
      {
        name: "Français",
        firstname: "Dorian",
        email: "dorian.francais@ynov.com",
        phoneNumber: "0645329060",
        lastConnection: new Date("2022-10-24T11:10:00.000"),
      },
    ]);
  }, []);

  const rows = employees.map((employee) => (
    <tr key={employee.name}>
      <td>
        <Group spacing="sm">
          <div>
            <Text size="sm" weight={500}>
              {employee.name.toUpperCase()} {employee.firstname}
            </Text>
            <Text size="xs" color="dimmed">
              {employee.email}
            </Text>
          </div>
        </Group>
      </td>

      <td>{employee.phoneNumber}</td>

      <td>
        <Group spacing="sm">
          <div>
            <Text size="sm" weight={400}>
              Il y a{" "}
              {Math.floor(
                (new Date().getTime() - employee.lastConnection.getTime()) /
                  8.64e7,
              ) + 1}{" "}
              jours
            </Text>
            <Text size="xs" color="dimmed">
              le {employee.lastConnection.toLocaleDateString()}
            </Text>
          </div>
        </Group>
      </td>

      <td>
        <Group spacing={0} position="center">
          <ActionIcon onClick={() => console.log("See")}>
            <IconEye size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon onClick={() => console.log("Edit")}>
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon color="red" onClick={() => console.log("Delete")}>
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Button
        type="submit"
        color="green.7"
        radius="md"
        mb="xl"
        component="a"
        href="/educator/registration"
      >
        <ActionIcon mr="xs" component="a" href="/educator/registration">
          <IconUserPlus size={20} stroke={1.5} color="white" />
        </ActionIcon>
        Ajouter un nouvel employé
      </Button>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Employés</th>
            <th>Numéro de téléphone</th>
            <th>Dernière connexion</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

export default MyEmployees;
