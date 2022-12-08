import { ActionIcon, Button, Group, ScrollArea, Table, Text, Drawer, Title, Divider } from '@mantine/core';
import { IconEye, IconPencil, IconTrash, IconUserPlus } from '@tabler/icons';
import Cookies from 'js-cookie';
import { useState, useEffect, Key } from 'react'
import ModifyDogForm from '../../../components/Forms/Dogs/ModifyDogForm';
import NewDogForm from '../../../components/Forms/Dogs/NewDogForm';
import { TOKEN_COOKIE } from '../../../helpers/restrictions';
import { useFetchSWR } from '../../../hooks/useFetchSWR';
import { DogInterface } from '../../../interfaces/Dog.interface';
import useDogsStyles from './Dogs.style'

const Dogs = () => {

    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(false);
    const [openModify, setOpenModify] = useState(false);
    const [dogId, setDogId] = useState(0);
    const { classes } = useDogsStyles();

    useEffect(() => {
      setMounted(true)
    }, []);

    const { data, mutate } = useFetchSWR(`/dogs`, mounted)

    const handleDelete = (dogId: number) => {
      return fetch(
        `${process.env.SERVER_API}/dogs/${dogId}`,
        {
          method: "DELETE",
          headers: { 
            Authorization: `Bearer ${Cookies.get(TOKEN_COOKIE)}`,
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      )
      .then(() => mutate())
      .catch((error) => {
        return error.message
      })
    }

    const rows = data?.map((dog: DogInterface, idx: Key) => (
      <tr key={idx}>
        <td>
          <Group spacing="sm">
            <div>
              <Text size="sm" weight={500}>
                {dog.name}
              </Text>
              <Text size="xs" color="dimmed">
                {`${dog.owner}`}
              </Text>
            </div>
          </Group>
        </td>

        <td>{`${dog.birthDate}`}</td>

        <td>{dog.breed}</td>

        <td>
          <Group spacing={0} position="center">
            <ActionIcon
              onClick={() => {
                setDogId(dog.id)
                setOpenModify(!openModify)
              }}
            >
              <IconPencil size={16} stroke={1.5} />
            </ActionIcon>
            <ActionIcon
              color="red"
              onClick={() => {
                handleDelete(dog.id)
              }}
            >
              <IconTrash size={16} stroke={1.5} />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    ))

  return (
    <>
      <ScrollArea>
        <Button
          color="green.7"
          onClick={() => setOpen(!open)}
          radius="md"
          mb="xl"
        >
          <ActionIcon mr="xs" component='a' href='/dog/new'>
            <IconUserPlus size={20} stroke={1.5} color="white" />
          </ActionIcon>
          Ajouter un nouveau chien
        </Button>
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Propriétaire</th>
              <th>Date de naissance</th>
              <th>Race</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
      <Drawer
        opened={open}
        onClose={() => setOpen(!open)}
        position="right"
        size={700}
      >
        <Title sx={{ padding: "1rem" }}>Ajouter un chien</Title>
        <Divider />
        <NewDogForm onClose={() => setOpen(!open)} mutate={mutate} />
      </Drawer>
      <Drawer
        opened={openModify}
        onClose={() => setOpenModify(!openModify)}
        position="right"
        size={700}
      >
        <Title>Modifier un chien</Title>
        <Divider />
        <ModifyDogForm dog={data?.find((dog: DogInterface) => dog.id === dogId)} onClose={() => setOpenModify(!openModify)} mutate={mutate} />
      </Drawer>
    </>
  )
}

export default Dogs