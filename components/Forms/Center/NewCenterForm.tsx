import { TextInput, Textarea, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";

const NewCenterForm = () => {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      name: "",
      address: "",
      phoneNumber: "",
      emailAddress: "",
      description: "",
    },

    validate: {
      emailAddress: (value) =>
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i.test(
          value,
        )
          ? null
          : "Ceci n'est pas une adresse email",
    },
  });

  const handleSubmit = () => {
    return fetch(`${process.env.SERVER_API}/establishments/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.values),
    })
      .then((response) => {
        if (response.status === 422) {
          throw new Error("This Establishment already exists");
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
    <form onSubmit={handleSubmit}>
      <TextInput
        required
        label="Nom du centre"
        p="lg"
        name="name"
        {...form.getInputProps("name")}
      />
      <TextInput
        required
        label="Adresse du centre"
        name="address"
        p="lg"
        {...form.getInputProps("address")}
      />
      <TextInput
        required
        label="Numéro de Téléphone"
        name="phoneNumber"
        p="lg"
        {...form.getInputProps("phoneNumber")}
      />
      <TextInput
        name="emailAddress"
        label="Adresse Email"
        required
        p="lg"
        {...form.getInputProps("emailAddress")}
      />
      <Textarea
        name="description"
        label="Description"
        required
        p="lg"
        {...form.getInputProps("description")}
      />
      <Button m="lg" type="submit" color="violet.6" radius="lg">
        Ajouter ce centre
      </Button>
    </form>
  );
};

export default NewCenterForm;
