import { TextInput, Textarea, Button } from '@mantine/core';
import { useState } from 'react'

const NewCenterForm = () => {

    const [credentials, setCredentials] = useState({
        name: "",
        address: "",
        phoneNumber: "",
        emailAddress: "",
        description: ""
    });

    const handleSubmit = () => {
      console.log('lol');
    }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput 
        required
        label="Nom du centre"
        p="lg"
        name='name'
        onChange={(event) => {
          event.preventDefault()
          setCredentials({ ...credentials, name: event.currentTarget.value })
        }}
      />
      <TextInput 
        required
        label="Adresse du centre"
        name='address'
        p="lg"
        onChange={(event) => {
          event.preventDefault()
          setCredentials({ ...credentials, address: event.currentTarget.value })
        }}
      />
      <TextInput 
        required
        label="Numéro de Téléphone"
        name='phoneNumber'
        p="lg"
        onChange={(event) => {
          event.preventDefault()
          setCredentials({ ...credentials, phoneNumber: event.currentTarget.value })
        }}
      />
      <TextInput 
        name='emailAddress'
        label="Adresse Email"
        required
        p="lg"
        onChange={(event) => {
          event.preventDefault()
          setCredentials({ ...credentials, emailAddress: event.currentTarget.value })
        }}
      />
      <Textarea 
        name='description'
        label="Description"
        required
        p="lg"
        onChange={(event) => {
          event.preventDefault()
          setCredentials({ ...credentials, description: event.currentTarget.value })
        }}
      />
      <Button m="lg" type='submit' color="violet.6" radius="lg">Enregistrer ce centre</Button>
    </form>
  )
}

export default NewCenterForm