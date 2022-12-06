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
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Key, useEffect, useState } from "react";
import ModifyCenterForm from "../../../components/Forms/Center/ModifyCenterForm";
import NewCenterForm from "../../../components/Forms/Center/NewCenterForm";
import { useFetchSWR } from "../../../hooks/useFetchSWR";
import { EstablishmentInterface } from "../../../interfaces/Establishment.interface";
import { UserInterface } from "../../../interfaces/User.interface";

const MyCenters = ({ user }: { user: UserInterface }) => {
  const [opened, setOpened] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const [establishmentId, setEstablishmentId] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const { data, mutate } = useFetchSWR("/establishments/list", mounted);

  const handleDelete = (establishmentId: number) => {
    return fetch(
      `${process.env.SERVER_API}/establishments/${establishmentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    )
      .then(() => mutate())
      .catch((error) => {
        return error.message;
      });
  };

  const rows = data?.map((establishment: EstablishmentInterface, idx: Key) => (
    <tr key={idx}>
      <td>
        <Group spacing="sm">
          <div>
            <Text size="sm" weight={500}>
              {establishment.name}
            </Text>
            <Text size="xs" color="dimmed">
              {establishment.description}
            </Text>
          </div>
        </Group>
      </td>

      <td>{establishment.adress}</td>

      <td>{establishment.phoneNumber}</td>

      <td>{establishment.email}</td>

      <td>
        <Group spacing={0} position="center">
          <ActionIcon onClick={() => console.log("See")}>
            <IconEye size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            onClick={() => {
              setEstablishmentId(establishment.id);
              setOpenModify(!openModify);
            }}
          >
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            color="red"
            onClick={() => handleDelete(establishment.id)}
          >
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <>
      <ScrollArea>
        <Button
          color="green.7"
          onClick={() => setOpened(!opened)}
          radius="md"
          mb="xl"
        >
          <ActionIcon mr="xs" component="a" href="/establishment/new">
            <IconUserPlus size={20} stroke={1.5} color="white" />
          </ActionIcon>
          Ajouter un nouveau centre
        </Button>
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th>Nom du centre</th>
              <th>Adresse</th>
              <th>Numéro de téléphone</th>
              <th>Adresse e-mail</th>
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
        <Title sx={{ padding: "1rem" }}>Ajouter un centre</Title>
        <Divider />
        <NewCenterForm owner={user} onClose={() => setOpened(!opened)} mutate={mutate} />
      </Drawer>
      <Drawer
        opened={openModify}
        onClose={() => setOpenModify(!openModify)}
        size={700}
        position="right"
      >
        <Title sx={{ padding: "1rem" }}>Modifier un centre</Title>
        <Divider />
        <ModifyCenterForm
          establishment={data?.find(
            (establishment: EstablishmentInterface) =>
              establishment.id === establishmentId,
          )}
          owner={user}
        />
      </Drawer>
    </>
  );
};

export default MyCenters;
