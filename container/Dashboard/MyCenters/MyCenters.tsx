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
import { useEffect, useState } from "react";
import NewCenterForm from "../../../components/Forms/Center/NewCenterForm";
import { EstablishmentInterface } from "../../../interfaces/Establishment.interface";
import { RoleEnum } from "../../../interfaces/User.interface";

const MyCenters = () => {
  const [centers, setCenters] = useState<EstablishmentInterface[]>([]);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    setCenters([
      {
        id: 1,
        owner: {
          id: 1,
          name: "Le Coz",
          role: RoleEnum.Administrator,
          firstName: "Yann",
          email: "ylcoz@icloud.com",
          phoneNumber: "0645329078",
          password: "",
          birthDate: new Date("1996-07-02T11:10:00.000"),
          registerDate: new Date("2022-11-04T11:10:00.000"),
          lastConnectionDate: new Date("2022-11-20T11:10:00.000"),
        },
        name: "Canine Center",
        description: "",
        address: "20 rue de la Vieille Roue, 33400 Bordeaux",
        phoneNumber: "0645656789",
        emailAddress: "contact@canine-center.com",
      },
    ]);
  }, []);

  const rows = centers.map(
    ({ id, name, description, address, phoneNumber, emailAddress }) => (
      <tr key={id}>
        <td>
          <Group spacing="sm">
            <div>
              <Text size="sm" weight={500}>
                {name}
              </Text>
              <Text size="xs" color="dimmed">
                {description}
              </Text>
            </div>
          </Group>
        </td>

        <td>{address}</td>

        <td>{phoneNumber}</td>

        <td>{emailAddress}</td>

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
    ),
  );

  return (
    <>
      <ScrollArea>
        <Button color="green.7" onClick={() => setOpened(!opened)} radius="md" mb="xl">
          <ActionIcon mr="xs">
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
        <Divider/>
        <NewCenterForm />
      </Drawer>
    </>
  );
};

export default MyCenters;
