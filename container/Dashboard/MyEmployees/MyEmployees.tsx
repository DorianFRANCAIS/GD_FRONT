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
import { RoleEnum, UserInterface } from "../../../interfaces/User.interface";

const MyEmployees = () => {
  const [employees, setEmployees] = useState<UserInterface[]>([]);

  useEffect(() => {
    setEmployees([
      {
        id: 1,
        name: "Lefort",
        role: RoleEnum.Administrator,
        firstName: "Edgar",
        email: "edgar.lefort@ynov.com",
        phoneNumber: "0645329089",
        password: "",
        birthDate: new Date("1996-07-02T11:10:00.000"),
        registerDate: new Date("2022-11-04T11:10:00.000"),
        lastConnectionDate: new Date("2022-11-20T11:10:00.000"),
      },
      {
        id: 2,
        name: "Chambaud",
        role: RoleEnum.Administrator,
        firstName: "Mathieu",
        email: "mathieuchambaud2000@gmail.com",
        phoneNumber: "0645329073",
        password: "",
        birthDate: new Date("1999-07-02T11:10:00.000"),
        registerDate: new Date("2022-11-10T11:10:00.000"),
        lastConnectionDate: new Date("2022-11-10T11:10:00.000"),
      },
      {
        id: 3,
        name: "Français",
        role: RoleEnum.Administrator,
        firstName: "Dorian",
        email: "dorian.français@ynov.com",
        phoneNumber: "0645326533",
        password: "",
        birthDate: new Date("1998-07-02T11:10:00.000"),
        registerDate: new Date("2020-10-23T11:10:00.000"),
        lastConnectionDate: new Date("2022-11-20T11:10:00.000"),
      },
    ]);
  }, []);

  const rows = employees.map((employee) => (
    <tr key={employee.id}>
      <td>
        <Group spacing="sm">
          <div>
            <Text size="sm" weight={500}>
              {employee.name.toUpperCase()} {employee.firstName}
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
                (new Date().getTime() - employee.lastConnectionDate.getTime()) /
                  8.64e7,
              ) + 1}{" "}
              jours
            </Text>
            <Text size="xs" color="dimmed">
              le {employee.lastConnectionDate.toLocaleDateString()}
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
