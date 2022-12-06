import React, { Key, useEffect, useState } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import {
  ActionIcon,
  Button,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { IconEye, IconPencil, IconTrash, IconUserPlus } from "@tabler/icons";
import { UserInterface } from "../../../interfaces/User.interface";
import NewEmployeeForm from "../../../components/Forms/Employees/NewEmployeeForm";
import { withData } from "../../../helpers/restrictions";
import { useFetchSWR } from "../../../hooks/useFetchSWR";
import ModifyEmployeeForm from "../../../components/Forms/Employees/ModifyEmployeeForm";

const MyEmployees = () => {
  const [opened, setOpened] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const [employeeId, setEmployeeId] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data, mutate } = useFetchSWR("/user", mounted);

  const handleDelete = (employeeId: number) => {
    return fetch(`${process.env.SERVER_API}/user/${employeeId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(() => mutate())
      .catch((error) => {
        return error.message;
      });
  };

  const rows = data?.map((employee: UserInterface, idx: Key) => {
    const lastConnectionDate = moment(employee.lastConnectionDate)
      .format("DD/MM/YYYY")
      .toString();

    return (
      <tr key={idx}>
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
          <Text size="sm" weight={400}>
            Le {`${lastConnectionDate}`}
          </Text>
        </td>

        <td>
          <Group spacing={0} position="center">
            <ActionIcon onClick={() => console.log("See")}>
              <IconEye size={16} stroke={1.5} />
            </ActionIcon>
            <ActionIcon
              onClick={() => {
                setEmployeeId(employee.id);
                setOpenModify(!openModify);
              }}
            >
              <IconPencil size={16} stroke={1.5} />
            </ActionIcon>
            <ActionIcon color="red" onClick={() => handleDelete(employee.id)}>
              <IconTrash size={16} stroke={1.5} />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    );
  });

  return (
    <>
      <ScrollArea>
        <Button
          onClick={() => setOpened(!opened)}
          color="green.7"
          radius="md"
          mb="xl"
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
      <Drawer
        opened={opened}
        onClose={() => setOpened(!opened)}
        position="right"
        size={700}
      >
        <Title sx={{ padding: "1rem" }}>Ajouter un employé</Title>
        <Divider />
        <NewEmployeeForm />
      </Drawer>
      <Drawer
        opened={openModify}
        onClose={() => setOpenModify(!openModify)}
        size={700}
        position="right"
      >
        <Title sx={{ padding: "1rem" }}>Modifier un employé</Title>
        <Divider />
        <ModifyEmployeeForm
          employee={data?.find(
            (employee: UserInterface) => employee.id === employeeId,
          )}
        />
      </Drawer>
    </>
  );
};

MyEmployees.getInitialProps = async (ctx: any) => {
  const { user } = await withData(ctx);

  return { user };
};

export default MyEmployees;
