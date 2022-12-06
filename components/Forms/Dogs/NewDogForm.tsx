import { useForm } from "@mantine/form"
import { TextInput, Textarea, Select, Button } from "@mantine/core"
import { useState } from "react"
import Cookies from "js-cookie"
import { TOKEN_COOKIE } from "../../../helpers/restrictions"
import { MutatorCallback } from "swr"
import { DatePicker } from "@mantine/dates"

const NewDogForm = ({ onClose, mutate } : { onClose: () => void, mutate: MutatorCallback }) => {

    const form = useForm({
      initialValues: {
        ownerId: 0,
        name: "",
        birthDate: "",
        breed: ""
      }
    })

    const handleSubmit = () => {
      return fetch(`${process.env.SERVER_API}/dogs/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Cookies.get(TOKEN_COOKIE)}`,
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form.values),
      }).then((response) => {
        if (response.status == 422) {
          throw new Error("This Dog already exists");
        }
        return response.json()
      })
      .then(() => {
        onClose()
        mutate()
      })
      .catch((error) => {
        console.log("error : " + error.message);
      });
    }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
        <Select m="lg" label="Propriétaire" data={[]} {...form.getInputProps("ownerId")} />
        <TextInput 
          required
          label="Nom du chien"
          name="name"
          p="lg"
          {...form.getInputProps('name')}
        />
        <DatePicker 
          required
          label="Date de naissance"
          name="birthDate"
          p="lg"
        />
        <TextInput 
          required
          label="Race du chien"
          name="breed"
          p="lg"
          {...form.getInputProps('breed')}
        />
        <Button m="lg" type="submit" color="violet.6" radius="lg">
          Ajouter ce chien
        </Button>
    </form>
  )
}

export default NewDogForm