import { TextInput, Textarea, PasswordInput, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";

const NewEmployeeForm = () => {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      name: "",
      firstName: "",
      email: "",
      birthDate: "",
      password: "testtest",
      phoneNumber: "",
    },

    validate: {
      email: (value) =>
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i.test(
          value,
        )
          ? null
          : "Ceci n'est pas une adresse email",
    },
  });

  const handleSubmit = () => {
    return fetch(`${process.env.SERVER_API}/educator/registration`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.values),
    })
      .then((response) => {
        if (response.status === 422) {
          throw new Error("User already exists");
        }
        return response.json();
      })
      .then((json) => {
        if (json.access_token) router.push({ pathname: "/dashboard" });
      })
      .catch((error) => {
        console.log("error : " + error.message);
      });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label="Nom (String)"
        name="name"
        required
        p="lg"
        {...form.getInputProps("name")}
      />
      <TextInput
        label="Prénom"
        name="firstName"
        required
        p="lg"
        {...form.getInputProps("firstName")}
      />
      <TextInput
        label="Email"
        required
        name="email"
        p="lg"
        {...form.getInputProps("email")}
      />
      <TextInput
        label="Numéro de téléphone"
        name="phoneNumber"
        p="lg"
        {...form.getInputProps("phoneNumber")}
      />
      <DatePicker
        placeholder="DD-MM-YYYY"
        name="birthDate"
        mt="md"
        p="lg"
        label="Date de naissance"
        dropdownPosition="bottom-start"
        inputFormat="DD-MM-YYYY"
        {...form.getInputProps("birthDate")}
      />
      <Button type="submit" m="lg" radius="lg" color="violet.6">
        Ajouter cet employé
      </Button>
    </form>
  );
};

export default NewEmployeeForm;
