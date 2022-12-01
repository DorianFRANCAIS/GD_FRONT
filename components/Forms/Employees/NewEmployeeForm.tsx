import { TextInput, Textarea, PasswordInput, Button } from "@mantine/core"
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form"
import { useState } from "react";

const NewEmployeeForm = () => {

    const [credentials, setCredentials] = useState({
      name: "",
      firstname: "",
      emailAddress: "",
      birthDate: "",
      password: "testtest",
    });

    const handleSubmit = () => {

    }

  return (
    <form onSubmit={handleSubmit}>
        <TextInput
            label="Nom (String)"
            name="name"
            required
            p="lg"
        />
        <TextInput 
          label="Prénom"
          name="firstname"
          required
          p="lg"
        />
        <TextInput 
          label="Email"
          required
          name="emailAddress"
          p="lg"
        />
        <DatePicker
          placeholder="DD-MM-YYYY"
          name="birthDate"
          mt="md"
          p="lg"
          label="Date de naissance"
          dropdownPosition="bottom-start"
          inputFormat="DD-MM-YYYY"
        />
        <Button 
          type="submit"
          m="lg"
          radius="lg"
          color="violet.6"
        >Ajouter cet employé</Button>
    </form>
  )
}

export default NewEmployeeForm