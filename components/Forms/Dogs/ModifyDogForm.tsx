import { useState } from 'react'
import { TextInput, Textarea, Select, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DogInterface } from '../../../interfaces/Dog.interface';
import Cookies from 'js-cookie';
import { TOKEN_COOKIE } from '../../../helpers/restrictions';
import { MutatorCallback } from 'swr';
import { DatePicker } from '@mantine/dates';

const ModifyDogForm = ({ dog, onClose, mutate } : { dog: DogInterface, onClose: () => void, mutate: MutatorCallback }) => {

    const form = useForm({
      initialValues: {
        ownerId: dog.owner.id,
        name: dog.name,
        birthDate: dog.birthDate,
        breed: dog.breed
      }
    })

    const handleSubmit = () => {
      return fetch(`${process.env.SERVER_API}/dogs/${dog.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Cookies.get(TOKEN_COOKIE)}`,
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form.values)
      })
      .then((response) => {
        if (response.status == 422) {
          throw Error("Something wen't wrong")
        }
        return response.json()
      })
      .then(() => {
        onClose()
        mutate()
      })
      .catch((error) => {
        console.log("error : " + error.message);
      })
    }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Select m="lg" label="Propriétaire" data={[]} {...form.getInputProps('ownerId')} />
      <TextInput 
        required
        label="Nom du chien"
        name='name'
        p="lg"
        {...form.getInputProps('name')}
      />
      <DatePicker 
        label="Date de naissance"
        name="birthDate"
        required
        p="lg"
        {...form.getInputProps('birthDate')}
      />
      <TextInput 
        label="Race du chien"
        name='breed'
        required
        p="lg"
        {...form.getInputProps('breed')}
      />
      <Button color="violet.6" radius="lg" m="lg" type='submit'>
        Modifier ce chien
      </Button>
    </form>
  )
}

export default ModifyDogForm